import { DataBuilderOptions } from './interfaces'

export class DataBuilder {
  private transform: NonNullable<DataBuilderOptions['transform']>

  constructor({ transform }: DataBuilderOptions) {
    this.transform = transform || []
  }

  build<U>(row: U): U {
    return this.transform.reduce<U>(
      (prev, transformer) => transformer(prev),
      row
    )
  }
}
