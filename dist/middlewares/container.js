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
var container_exports = {};
__export(container_exports, {
  container: () => container
});
module.exports = __toCommonJS(container_exports);
var import_inversify = require("inversify");
const container = (...modules) => {
  const handler = (req, res, next) => {
    const container2 = new import_inversify.Container();
    for (const module2 of modules) {
      container2.load(module2 instanceof import_inversify.ContainerModule ? module2 : module2(req, res));
    }
    req.container = container2;
    next();
  };
  return handler;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  container
});
