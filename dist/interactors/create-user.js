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
var create_user_exports = {};
__export(create_user_exports, {
  CreateUserInteractor: () => CreateUserInteractor
});
module.exports = __toCommonJS(create_user_exports);
var import_inversify = require("inversify");
var import_transaction = require("../modules/transaction");
let CreateUserInteractor = class {
  constructor(presenter, prisma, txn) {
    this.presenter = presenter;
    this.prisma = prisma;
    this.txn = txn;
  }
  async interact() {
    const is_exists = await this.prisma.user.findFirst();
    await this.txn.exec(async (prisma) => {
      const is_exists2 = await this.prisma.user.findFirst();
      const user = await prisma.user.create({
        data: {}
      });
      await prisma.userName.create({
        data: {
          user_id: user.id,
          content: "taro"
        }
      });
    });
    this.presenter.output(204);
  }
};
CreateUserInteractor = __decorateClass([
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)("OutputPort")),
  __decorateParam(1, (0, import_inversify.inject)("Prisma")),
  __decorateParam(2, (0, import_inversify.inject)(import_transaction.Transaction))
], CreateUserInteractor);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserInteractor
});
