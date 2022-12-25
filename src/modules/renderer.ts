import { ContainerModule, injectable } from "inversify";
import ejs from 'ejs'
import { join } from 'path'

export interface RendererPort {
  renderFile(file_path: string, data: { [prop: string]: any }): Promise<string>
}

@injectable()
export class Renderer implements RendererPort {
  async renderFile(file_path: string, data: { [prop: string]: any; }): Promise<string> {
    return await ejs.renderFile(
      join(__dirname, '../../src/templates', `${file_path}.ejs`),
      data
    )
  }
}
export const module = new ContainerModule((bind) => {
  bind<RendererPort>('Renderer').to(Renderer)
})