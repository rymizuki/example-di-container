"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var criteria_builder_exports = {};
__export(criteria_builder_exports, {
  CriteriaBuilder: () => CriteriaBuilder
});
module.exports = __toCommonJS(criteria_builder_exports);
var import_just_safe_set = __toESM(require("just-safe-set"));
var import_criteria = require("./criteria");
class CriteriaBuilder {
  constructor(spec) {
    this.spec = spec;
  }
  async build(input) {
    const criteria = this.createCriteriaFromInput(input);
    return criteria;
  }
  createCriteriaFromInput(input) {
    if (!this.spec || !this.spec.rules) {
      return new import_criteria.Criteria({});
    }
    const { rules } = this.spec;
    const params = Object.keys(rules).reduce((prev, prop) => {
      const content = rules[prop];
      const [target, to_prop] = content.split(":");
      if (!prev[target]) {
        prev[target] = {};
      }
      if (to_prop) {
        (0, import_just_safe_set.default)(prev[target], to_prop, input[prop]);
      } else {
        prev[target] = input[prop];
      }
      return prev;
    }, {});
    return new import_criteria.Criteria(params);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CriteriaBuilder
});
