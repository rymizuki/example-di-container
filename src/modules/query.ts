import { ContainerModule } from "inversify";
import { QueryResponsePort, QuerySpecPort } from "~/lib/query";
import { QueryDriverPrisma } from "../lib/query/drivers/prisma";
import { QueryDriverPort } from "../lib/query/interfaces";
import { QueryBuilder } from "../lib/query/query-builder";

type Drivers = Map<string, QueryDriverPort>

export class QueryRunner {
  constructor(private drivers: Drivers) { }

  get<R extends QueryResponsePort>(Spec: new () => QuerySpecPort<R>) {
    return new QueryBuilder<R, InstanceType<typeof Spec>, Drivers>(
      Spec,
      this.drivers,
      {
        rules: {
          rows: 'take',
          skip: 'skip'
        }
      }
    )
  }
}


export const module = new ContainerModule((bind) => {
  bind<QueryRunner>(QueryRunner).toDynamicValue(({ container }) => {
    const drivers = new Map<string, QueryDriverPort>()
    drivers.set('prisma', new QueryDriverPrisma(container))
    return new QueryRunner(drivers)
  })
})