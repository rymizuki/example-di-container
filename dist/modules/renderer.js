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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var renderer_exports = {};
__export(renderer_exports, {
  Renderer: () => Renderer,
  module: () => module2
});
module.exports = __toCommonJS(renderer_exports);
var import_inversify = require("inversify");
var import_ejs = __toESM(require("ejs"));
var import_path = require("path");
let Renderer = class {
  async renderFile(file_path, data) {
    return await import_ejs.default.renderFile(
      (0, import_path.join)(__dirname, "../../src/templates", `${file_path}.ejs`),
      data
    );
  }
};
Renderer = __decorateClass([
  (0, import_inversify.injectable)()
], Renderer);
const module2 = new import_inversify.ContainerModule((bind) => {
  bind("Renderer").to(Renderer);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Renderer,
  module
});
