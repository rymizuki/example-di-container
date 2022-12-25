import { Prisma, PrismaClient } from "@prisma/client";
import { Request } from "express";
import { ContainerModule, inject, injectable } from "inversify";
import { createModule, module as prisma_module, PrismaClientWrapper } from '../modules/prisma';

@injectable()
export class Transaction {
  private in_progress: boolean = false

  constructor(
    @inject('Request')
    private request: Request,
    @inject('Prisma')
    private prisma: PrismaClient
  ) { }

  async exec(fn: (prisma: Prisma.TransactionClient) => Promise<void>): Promise<void> {
    // XXX: containerの取得のためにrequestを呼びたくないんだよな
    const { container } = this.request

    const txn = this.in_progress
      // すでにtransactionの中にいたらtransaction発行しない
      ? async () => {
        const prisma = container.get<PrismaClientWrapper>('Prisma')
        await fn(prisma)
      }
      // トランザクション中でなければ新しくトランザクションを発行する
      : async () => {
        const client = this.prisma
        await client.$transaction(async (prisma) => {
          this.in_progress = true

          // prismaのモジュールをtransaction clientに置き換える
          const txn_module = createModule(prisma)
          container.unload(prisma_module)
          container.load(txn_module)

          try {
            await fn(prisma)
          } finally {
            container.unload(txn_module)
            container.load(prisma_module)
            this.in_progress = false
          }
        })
      }

    await txn()
  }
}

export const module = new ContainerModule((bind) => {
  bind<Transaction>(Transaction).toSelf().inSingletonScope()
})