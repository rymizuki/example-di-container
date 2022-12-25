import { CriteriaPort } from './interfaces'

export class Criteria implements CriteriaPort {
  public where?: any
  public take?: any
  public skip?: any

  constructor({
    where,
    take,
    skip
  }: {
    where?: { [prop: string]: any }
    take?: any
    skip?: any
  }) {
    this.where = where || undefined
    this.take = take
    this.skip = skip
  }
}
