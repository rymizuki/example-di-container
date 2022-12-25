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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
var transaction_exports = {};
__export(transaction_exports, {
  Transaction: () => Transaction,
  module: () => module2
});
module.exports = __toCommonJS(transaction_exports);
var import_inversify = require("inversify");
var import_prisma = require("../modules/prisma");
let Transaction = class {
  constructor(request, prisma) {
    this.request = request;
    this.prisma = prisma;
  }
  in_progress = false;
  async exec(fn) {
    const { container } = this.request;
    const txn = this.in_progress ? async () => {
      const prisma = container.get("Prisma");
      await fn(prisma);
    } : async () => {
      const client = this.prisma;
      await client.$transaction(async (prisma) => {
        this.in_progress = true;
        const txn_module = (0, import_prisma.createModule)(prisma);
        container.unload(import_prisma.module);
        container.load(txn_module);
        try {
          await fn(prisma);
        } finally {
          container.unload(txn_module);
          container.load(import_prisma.module);
          this.in_progress = false;
        }
      });
    };
    await txn();
  }
};
Transaction = __decorateClass([
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)("Request")),
  __decorateParam(1, (0, import_inversify.inject)("Prisma"))
], Transaction);
const module2 = new import_inversify.ContainerModule((bind) => {
  bind(Transaction).toSelf().inSingletonScope();
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Transaction,
  module
});
