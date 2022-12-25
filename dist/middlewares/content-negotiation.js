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
var content_negotiation_exports = {};
__export(content_negotiation_exports, {
  HTMLPresenter: () => HTMLPresenter,
  JSONPresenter: () => JSONPresenter,
  module: () => module2
});
module.exports = __toCommonJS(content_negotiation_exports);
var import_inversify = require("inversify");
const module2 = (req) => {
  const dispatchPresenter = (mime_type2) => {
    if (/^text\/html/.test(mime_type2)) {
      return HTMLPresenter;
    }
    if (/^application\/json/.test(mime_type2)) {
      return JSONPresenter;
    }
    throw new Error(`Content Negotiation failed. unsupported mime-type from ${mime_type2}`);
  };
  const mime_type = req.header("accept") || "";
  const config = {
    mime_type,
    language: req.header("accept-language")
  };
  console.debug("ACCEPT:", config);
  const Presenter = dispatchPresenter(mime_type);
  return new import_inversify.ContainerModule((bind) => {
    bind("OutputPort").toDynamicValue(
      ({ container }) => new Presenter(container.get("Response"), config)
    );
  });
};
class AbstractPresenter {
  constructor(response, config) {
    this.response = response;
    this.config = config;
  }
}
let HTMLPresenter = class extends AbstractPresenter {
  output(status, data) {
    this.response.header("Content-Type", "text/html").header("Content-Language", this.config.language).status(status).send(data);
  }
};
HTMLPresenter = __decorateClass([
  (0, import_inversify.injectable)()
], HTMLPresenter);
!(0, import_inversify.injectable)();
class JSONPresenter extends AbstractPresenter {
  output(status, data) {
    this.response.header("Content-Type", "application/json").header("Content-Language", this.config.language).status(status).send(JSON.stringify(data));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HTMLPresenter,
  JSONPresenter,
  module
});
