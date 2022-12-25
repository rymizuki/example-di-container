"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var query_builder_exports = {};
__export(query_builder_exports, {
  QueryBuilder: () => QueryBuilder
});
module.exports = __toCommonJS(query_builder_exports);
var import_criteria_builder = require("./criteria-builder");
var import_data_builder = require("./data-builder");
class QueryBuilder {
  constructor(spec_class, drivers, default_query_condition = {}) {
    this.spec_class = spec_class;
    this.drivers = drivers;
    this.spec = new this.spec_class();
    const { transform, rules } = this.spec.input || {};
    this.criteria_builder = new import_criteria_builder.CriteriaBuilder({
      transform,
      rules: Object.assign({}, rules, default_query_condition.rules || {})
    });
    this.data_builder = new import_data_builder.DataBuilder(this.spec.output || {});
  }
  spec;
  criteria_builder;
  data_builder;
  async run(input, tx) {
    const driver = this.drivers.get(this.spec.source.driver);
    const criteria = await this.criteria_builder.build(input);
    if (!driver) {
      throw new Error(
        `QueryBuilder can not run. driver "${this.spec.source.driver}" is not defined.`
      );
    }
    const rows = await driver.run(this.spec.source, criteria, tx);
    return rows.map((row) => this.data_builder.build(row)).filter((row) => !!row).map((row) => new this.spec.data_class(row));
  }
  async one(input, tx) {
    const rows = await this.run(Object.assign({ rows: 1 }, input), tx);
    if (!rows.length) {
      return null;
    }
    return rows[0];
  }
  async many(input = {}) {
    return await this.run(input);
  }
  async many_with_next(input = {}) {
    const params = { ...input, rows: Number(input.rows) + 1 };
    const result = await this.run(params);
    const next = result.splice(Number(input.rows), 1)[0] || null;
    return [result, next];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QueryBuilder
});
