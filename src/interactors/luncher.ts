import { inject, injectable } from "inversify"
import { InputPort } from "~/input-port"
import { OutputPort } from "~/middlewares/content-negotiation"
import { RendererPort } from "~/modules/renderer"

@injectable()
export class LuncherInteractor implements InputPort {
  constructor(
    @inject('OutputPort')
    private presenter: OutputPort,
    @inject('Renderer')
    private renderer: RendererPort
  ) { }

  async interact(): Promise<void> {
    const body = await this.renderer.renderFile('luncher', {})
    this.presenter.output(
      200,
      body,
    )
  }
}