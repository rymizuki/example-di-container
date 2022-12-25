import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { InputPort } from "~/input-port";
import { OutputPort } from "~/middlewares/content-negotiation";

@injectable()
export class ReadUsersInteractor implements InputPort {
  constructor(
    @inject('OutputPort')
    private presenter: OutputPort,
    @inject('Prisma')
    private prisma: PrismaClient
  ) {
  }

  async interact(): Promise<void> {
    const users = await this.prisma.user.findMany({
      include: {
        name: true
      }
    })
    this.presenter.output(200, users)
  }
}