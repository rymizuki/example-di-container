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
var data_builder_exports = {};
__export(data_builder_exports, {
  DataBuilder: () => DataBuilder
});
module.exports = __toCommonJS(data_builder_exports);
class DataBuilder {
  transform;
  constructor({ transform }) {
    this.transform = transform || [];
  }
  build(row) {
    return this.transform.reduce(
      (prev, transformer) => transformer(prev),
      row
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataBuilder
});
