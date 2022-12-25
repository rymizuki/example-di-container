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
var prisma_exports = {};
__export(prisma_exports, {
  createModule: () => createModule,
  module: () => module2
});
module.exports = __toCommonJS(prisma_exports);
var import_inversify = require("inversify");
var import_prisma = require("../infra/prisma");
const createModule = (prisma2) => {
  return new import_inversify.ContainerModule((bind) => {
    bind("Prisma").toDynamicValue(() => prisma2);
  });
};
const module2 = createModule(import_prisma.prisma);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createModule,
  module
});
