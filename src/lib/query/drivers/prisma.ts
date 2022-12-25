
import { interfaces } from 'inversify'
import { PrismaClientWrapper } from '~/modules/prisma'
import { CriteriaPort, QueryDriverPort, QuerySource } from '../interfaces'

export class QueryDriverPrisma implements QueryDriverPort {
  constructor(private container: interfaces.Container) {
  }
  async run<T>(
    { runner }: QuerySource,
    criteria: CriteriaPort,
  ): Promise<T> {
    const prisma = this.container.get<PrismaClientWrapper>('Prisma')
    return await runner(prisma, criteria)
  }
}
