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
var luncher_exports = {};
__export(luncher_exports, {
  LuncherInteractor: () => LuncherInteractor
});
module.exports = __toCommonJS(luncher_exports);
var import_inversify = require("inversify");
let LuncherInteractor = class {
  constructor(presenter, renderer) {
    this.presenter = presenter;
    this.renderer = renderer;
  }
  async interact() {
    const body = await this.renderer.renderFile("luncher", {});
    this.presenter.output(
      200,
      body
    );
  }
};
LuncherInteractor = __decorateClass([
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)("OutputPort")),
  __decorateParam(1, (0, import_inversify.inject)("Renderer"))
], LuncherInteractor);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LuncherInteractor
});
