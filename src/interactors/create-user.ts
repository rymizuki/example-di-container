import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { InputPort } from "~/input-port";
import { OutputPort } from "~/middlewares/content-negotiation";
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
  ) { }

  async interact(): Promise<void> {
    const is_exists = await this.prisma.user.findFirst()
    await this.txn.exec(async (prisma) => {
      const is_exists = await this.prisma.user.findFirst()
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
    })
    this.presenter.output(204)
  }
}