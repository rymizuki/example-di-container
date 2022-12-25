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
  createQuery: () => createQuery
});
module.exports = __toCommonJS(query_exports);
var import_prisma = require("./drivers/prisma");
var import_query_builder = require("./query-builder");
const drivers = /* @__PURE__ */ new Map();
drivers.set("prisma", new import_prisma.QueryDriverPrisma());
function createQuery(spec_class) {
  return new import_query_builder.QueryBuilder(
    spec_class,
    drivers,
    {
      rules: {
        rows: "take",
        skip: "skip"
      }
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createQuery
});
