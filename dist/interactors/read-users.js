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
var read_users_exports = {};
__export(read_users_exports, {
  ReadUsersInteractor: () => ReadUsersInteractor
});
module.exports = __toCommonJS(read_users_exports);
var import_inversify = require("inversify");
let ReadUsersInteractor = class {
  constructor(presenter, prisma) {
    this.presenter = presenter;
    this.prisma = prisma;
  }
  async interact() {
    const users = await this.prisma.user.findMany({
      include: {
        name: true
      }
    });
    this.presenter.output(200, users);
  }
};
ReadUsersInteractor = __decorateClass([
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)("OutputPort")),
  __decorateParam(1, (0, import_inversify.inject)("Prisma"))
], ReadUsersInteractor);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReadUsersInteractor
});
