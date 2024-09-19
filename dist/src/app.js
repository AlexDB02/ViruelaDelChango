"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const envs_plugin_1 = require("./config/envs.plugin");
const init_1 = require("./data/init");
const routes2_1 = require("./controllers/routes2");
const emailJob_1 = require("./domain/jobs/emailJob");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes2_1.AppRoutes.routes);
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return yield init_1.MongoDatabase.connect({
        dbName: "MonkeyPoxCasesAPI",
        mongoUrl: (_a = envs_plugin_1.envs.MONGO_URL) !== null && _a !== void 0 ? _a : ""
    });
}))();
app.listen(3000, () => {
    console.log("El servidor está corriendo correctamente.");
    (0, emailJob_1.emailJob)();
});
