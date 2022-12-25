import { QueryDriverPrisma } from './drivers/prisma'
import {
  CriteriaPort,
  QueryDriverPort,
  QueryResponsePort,
  QuerySpecPort
} from './interfaces'
import { QueryBuilder } from './query-builder'

const drivers = new Map<string, QueryDriverPort>()
drivers.set('prisma', new QueryDriverPrisma())

export function createQuery<R extends QueryResponsePort>(
  spec_class: new () => QuerySpecPort<R>
) {
  return new QueryBuilder<R, InstanceType<typeof spec_class>, typeof drivers>(
    spec_class,
    drivers,
    {
      rules: {
        // template literal typesにしたい
        rows: 'take',
        skip: 'skip'
      }
    }
  )
}

export type { QuerySpecPort, QueryResponsePort, CriteriaPort }
