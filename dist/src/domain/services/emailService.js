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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const envs_plugin_1 = require("../../config/envs.plugin");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: envs_plugin_1.envs.MAIL_SERVICE,
            auth: {
                user: envs_plugin_1.envs.MAIL_USER,
                pass: envs_plugin_1.envs.MAIL_SECRET_KEY
            }
        });
    }
    sendEmail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sentInformation = yield this.transporter.sendMail({
                    to: options.to,
                    subject: options.subject,
                    html: options.htmlBody
                });
                console.log(sentInformation);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.EmailService = EmailService;
