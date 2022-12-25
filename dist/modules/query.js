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
var query_exports = {};
__export(query_exports, {
  QueryRunner: () => QueryRunner,
  module: () => module2
});
module.exports = __toCommonJS(query_exports);
var import_inversify = require("inversify");
var import_prisma = require("../lib/query/drivers/prisma");
var import_query_builder = require("../lib/query/query-builder");
class QueryRunner {
  constructor(drivers) {
    this.drivers = drivers;
  }
  get(Spec) {
    return new import_query_builder.QueryBuilder(
      Spec,
      this.drivers,
      {
        rules: {
          rows: "take",
          skip: "skip"
        }
      }
    );
  }
}
const module2 = new import_inversify.ContainerModule((bind) => {
  bind(QueryRunner).toDynamicValue(({ container }) => {
    const drivers = /* @__PURE__ */ new Map();
    drivers.set("prisma", new import_prisma.QueryDriverPrisma(container));
    return new QueryRunner(drivers);
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QueryRunner,
  module
});
