import { Prisma } from '@prisma/client'

import { CriteriaBuilder } from './criteria-builder'
import { DataBuilder } from './data-builder'
import {
  InputPort,
  QueryCondition,
  QueryDriverPort,
  QueryResponsePort,
  QuerySpecPort
} from './interfaces'

export class QueryBuilder<
  R extends QueryResponsePort,
  S extends QuerySpecPort<R>,
  D extends Map<string, QueryDriverPort>
> {
  private spec: S
  private criteria_builder: CriteriaBuilder
  private data_builder: DataBuilder

  constructor(
    private spec_class: new () => S,
    private drivers: D,
    default_query_condition: QueryCondition = {}
  ) {
    this.spec = new this.spec_class()
    const { transform, rules } = this.spec.input || {}
    this.criteria_builder = new CriteriaBuilder({
      transform,
      rules: Object.assign({}, rules, default_query_condition.rules || {})
    })
    this.data_builder = new DataBuilder(this.spec.output || {})
  }
  async run(input: InputPort, tx?: Prisma.TransactionClient): Promise<R[]> {
    const driver = this.drivers.get(this.spec.source.driver)
    const criteria = await this.criteria_builder.build(input)
    if (!driver) {
      throw new Error(
        `QueryBuilder can not run. driver "${this.spec.source.driver}" is not defined.`
      )
    }
    const rows = await driver.run(this.spec.source, criteria, tx)

    return rows
      .map((row) => this.data_builder.build(row))
      .filter((row) => !!row) // XXX: transformでnull返したとき用
      .map((row) => new this.spec.data_class(row))
  }

  async one(
    input: InputPort,
    tx?: Prisma.TransactionClient
  ): Promise<R | null> {
    const rows = await this.run(Object.assign({ rows: 1 }, input), tx)
    if (!rows.length) {
      return null
    }
    return rows[0]
  }

  async many(input: InputPort = {}): Promise<R[]> {
    return await this.run(input)
  }

  async many_with_next(input: InputPort = {}): Promise<[R[], R | null]> {
    const params = { ...input, rows: Number(input.rows) + 1 }
    const result = await this.run(params)
    const next = result.splice(Number(input.rows), 1)[0] || null

    return [result, next]
  }
}
