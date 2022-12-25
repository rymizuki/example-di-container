import { Prisma, PrismaClient } from "@prisma/client";
import { ContainerModule } from "inversify";
import { prisma } from "../infra/prisma";


export type PrismaClientWrapper = PrismaClient | Prisma.TransactionClient

export const createModule = (prisma: PrismaClientWrapper) => {
  return new ContainerModule((bind) => {
    bind<PrismaClientWrapper>('Prisma').toDynamicValue(() => prisma)
  })
}

export const module = createModule(prisma)