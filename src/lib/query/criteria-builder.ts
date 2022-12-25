import set from 'just-safe-set'
import { Criteria } from './criteria'
import { CriteriaPort, InputPort, QueryCondition } from './interfaces'

export class CriteriaBuilder {
  constructor(private spec?: QueryCondition) {}

  async build(input: InputPort): Promise<CriteriaPort> {
    const criteria = this.createCriteriaFromInput(input)
    return criteria
  }

  private createCriteriaFromInput(input: InputPort) {
    if (!this.spec || !this.spec.rules) {
      return new Criteria({})
    }
    const { rules } = this.spec
    const params = Object.keys(rules).reduce((prev, prop) => {
      const content = rules[prop]
      const [target, to_prop] = content.split(':')
      if (!prev[target]) {
        prev[target] = {} as any
      }
      if (to_prop) {
        set(prev[target], to_prop, input[prop])
      } else {
        prev[target] = input[prop]
      }
      return prev
    }, {} as any)
    return new Criteria(params)
  }
}
