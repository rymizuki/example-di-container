import { Request, Response } from "express"
import { ContainerModule, injectable } from "inversify"

declare global {
  namespace Express {
    export interface Request {
      presenter: OutputPort
    }
  }
}

/**
 * 
 * @see https://developer.mozilla.org/ja/docs/Web/HTTP/Content_negotiation
 */
export const module = (req: Request) => {
  const dispatchPresenter = (mime_type: string) => {
    if (/^text\/html/.test(mime_type)) {
      return HTMLPresenter
    }
    if (/^application\/json/.test(mime_type)) {
      return JSONPresenter
    }
    throw new Error(`Content Negotiation failed. unsupported mime-type from ${mime_type}`)
  }

  const mime_type = req.header('accept') || ''
  const config = {
    mime_type,
    language: req.header('accept-language'),
  }
  console.debug('ACCEPT:', config)

  const Presenter = dispatchPresenter(mime_type)

  return new ContainerModule((bind) => {
    bind<OutputPort>('OutputPort').toDynamicValue(({ container }) =>
      new Presenter(container.get('Response'), config)
    )
  })
}

export interface OutputPort {
  output(status: number, body?: any): void
}

abstract class AbstractPresenter {
  constructor(
    protected response: Response,
    protected config: {
      mime_type: string
      language?: string
    }
  ) {
  }
}

@injectable()
export class HTMLPresenter extends AbstractPresenter {
  output(status: number, data?: any) {
    this.response
      .header('Content-Type', 'text/html')
      .header('Content-Language', this.config.language)
      .status(status)
      .send(data)
  }
}

!injectable()
export class JSONPresenter extends AbstractPresenter {
  output(status: number, data?: any) {
    this.response
      .header('Content-Type', 'application/json')
      .header('Content-Language', this.config.language)
      .status(status)
      .send(JSON.stringify(data))
  }
}