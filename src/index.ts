import "reflect-metadata"

import dotenv from 'dotenv'
dotenv.config({ path: '.env.development' })

import express, { Request, RequestHandler, Response } from 'express'
import { ContainerModule } from 'inversify'
import { CreateUserInteractor } from "./interactors/create-user"
import { LuncherInteractor } from './interactors/luncher'
import { ReadUsersInteractor } from "./interactors/read-users"
import { container } from './middlewares/container'
import { module as presenter_module } from './middlewares/content-negotiation'
import { module as renderer_module } from "./modules/renderer"
import { module as prisma_module } from './modules/prisma'
import { module as transaction_module } from './modules/transaction'
import { module as query_module } from './modules/query'

const app = express()

/**
 * DI Containerをリクエストごとに生成する
 */
app.use(container(
  (req, res) => new ContainerModule((bind) => {
    bind<Request>('Request').toDynamicValue(() => req)
    bind<Response>('Response').toDynamicValue(() => res)
  }),
  new ContainerModule((bind) => {
    bind<LuncherInteractor>(LuncherInteractor).toSelf()
    bind<ReadUsersInteractor>(ReadUsersInteractor).toSelf()
    bind<CreateUserInteractor>(CreateUserInteractor).toSelf()
  }),
  presenter_module,
  renderer_module,
  prisma_module,
  transaction_module,
  query_module,
))

/**
 * Routingの設定
 */
app.get('/', interact(LuncherInteractor))
app.get('/api/users', interact(ReadUsersInteractor))
app.post('/api/users', interact(CreateUserInteractor))

// interactor呼び出しのショートハンド
// XXX: arrow関数に対してdecoratorかけられんので...
function interact(Interactor: new (...args: any[]) => void) {
  const handler: RequestHandler = async (req) => {
    const interactor = req.container.get(Interactor)
    await interactor.interact()
  }
  return handler
}

const port = 3000
const host = '0.0.0.0'
app.listen(port, host, () => {
  console.log(`server listen on  http://${host}:${port}/`)
})
