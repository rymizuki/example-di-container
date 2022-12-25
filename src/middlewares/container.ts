import { Request, RequestHandler, Response } from 'express'
import { Container, ContainerModule } from 'inversify'

declare global {
  namespace Express {
    export interface Request {
      container: Container
    }
  }
}

export const container = (...modules: (ContainerModule | ((req: Request, res: Response) => ContainerModule))[]) => {
  const handler: RequestHandler = (req, res, next) => {
    const container = new Container()

    for (const module of modules) {
      container.load(module instanceof ContainerModule ? module : module(req, res))
    }

    req.container = container

    next()
  }

  return handler
}
