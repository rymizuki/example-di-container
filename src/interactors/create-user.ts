import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { inject, injectable } from "inversify";
import { InputPort } from "~/input-port";
import { CriteriaPort, QueryResponsePort, QuerySpecPort } from "~/lib/query";
import { OutputPort } from "~/middlewares/content-negotiation";
import { PrismaClientWrapper } from "~/modules/prisma";
import { QueryRunner } from "../modules/query";
import { Transaction } from "../modules/transaction";

@injectable()
export class CreateUserInteractor implements InputPort {
  constructor(
    @inject('OutputPort')
    private presenter: OutputPort,
    @inject('Prisma')
    private prisma: PrismaClient,
    @inject(Transaction)
    private txn: Transaction,
    @inject('Request')
    private request: Request,
    @inject(QueryRunner)
    private query: QueryRunner
  ) { }

  async interact(): Promise<void> {
    await this.txn.exec(async (prisma) => {
      const user = await prisma.user.create({
        data: {
        }
      })
      await prisma.userName.create({
        data: {
          user_id: user.id,
          content: 'taro',
        }
      })
      const user2 = await this.query.get(UserQuerySpec).one({ id: user.id })
      console.log(user, user2)
    })
    this.presenter.output(204)
  }
}

class UserQueryData implements QueryResponsePort {
  public id: number
  public name: string

  constructor(attr: any) {
    this.id = attr.id
    this.name = attr.name.content
  }
}

class UserQuerySpec implements QuerySpecPort<UserQueryData> {
  data_class = UserQueryData

  source = {
    driver: 'prisma',
    runner: (prisma: PrismaClientWrapper, { where, take }: CriteriaPort) => {
      return prisma.user.findMany({
        where,
        take,
        include: {
          name: true,
        }
      })
    }
  } as const

  input = {
    rules: {
      id: 'where:id',
    }
  }
}