"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_reflect_metadata = require("reflect-metadata");
var import_dotenv = __toESM(require("dotenv"));
var import_express = __toESM(require("express"));
var import_inversify = require("inversify");
var import_create_user = require("./interactors/create-user");
var import_luncher = require("./interactors/luncher");
var import_read_users = require("./interactors/read-users");
var import_container = require("./middlewares/container");
var import_content_negotiation = require("./middlewares/content-negotiation");
var import_renderer = require("./modules/renderer");
var import_prisma = require("./modules/prisma");
var import_transaction = require("./modules/transaction");
import_dotenv.default.config({ path: ".env.development" });
const app = (0, import_express.default)();
app.use((0, import_container.container)(
  (req, res) => new import_inversify.ContainerModule((bind) => {
    bind("Request").toDynamicValue(() => req);
    bind("Response").toDynamicValue(() => res);
  }),
  new import_inversify.ContainerModule((bind) => {
    bind(import_luncher.LuncherInteractor).toSelf();
    bind(import_read_users.ReadUsersInteractor).toSelf();
    bind(import_create_user.CreateUserInteractor).toSelf();
  }),
  import_content_negotiation.module,
  import_renderer.module,
  import_prisma.module,
  import_transaction.module
));
app.get("/", interact(import_luncher.LuncherInteractor));
app.get("/api/users", interact(import_read_users.ReadUsersInteractor));
app.post("/api/users", interact(import_create_user.CreateUserInteractor));
function interact(Interactor) {
  const handler = async (req) => {
    const interactor = req.container.get(Interactor);
    await interactor.interact();
  };
  return handler;
}
const port = 3e3;
const host = "0.0.0.0";
app.listen(port, host, () => {
  console.log(`server listen on  http://${host}:${port}/`);
});
