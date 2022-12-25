import { Prisma, PrismaClient } from '@prisma/client'

export interface InputPort {
  [prop: string]: string | number | boolean
}
export interface CriteriaPort {
  where?: any
  take?: number
  skip?: number
}

export interface QueryDriverPort {
  run(
    source: QuerySource,
    criteria: CriteriaPort,
    tx?: Prisma.TransactionClient
  ): Promise<any[]>
}

export type QuerySource = {
  driver: 'prisma'
  runner: (
    prisma: Prisma.TransactionClient,
    criteria: CriteriaPort
  ) => Promise<any>
}

export type QueryCondition = {
  transform?: [] // TODO: いまはちと想定できぬ https://github.com/siremohq/siremo-web/issues/762
  rules?: {
    [from_prop: string]: string
  }
}

export type DataBuilderOptions = {
  transform?: readonly ((data: any) => any)[] // TODO: いい感じに型つける https://github.com/siremohq/siremo-web/issues/762
}

export interface QuerySpecPort<R extends QueryResponsePort> {
  data_class: new (attr: { [prop: string]: any }) => R
  source: QuerySource
  input?: QueryCondition
  output?: DataBuilderOptions
}

export interface QueryResponsePort {}
