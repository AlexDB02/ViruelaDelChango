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
exports.emailJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const changoModels_1 = require("../../data/models/changoModels");
const emailService_1 = require("../services/emailService");
const emailTemplate_1 = require("../templates/emailTemplate");
const emailService = new emailService_1.EmailService();
const emailJob = () => {
    node_cron_1.default.schedule("*/10 * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const viruelaMonos = yield changoModels_1.changoModel.find({ isSent: false });
            if (!viruelaMonos.length) {
                console.log("No hay casos nuevos registrados.");
                return;
            }
            console.log(`Procesando ${viruelaMonos.length} casos.`);
            yield Promise.all(viruelaMonos.map((monkeyPox) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(monkeyPox);
                try {
                    const htmlBody = (0, emailTemplate_1.generatemonkeyPoxEmailTemplate)(monkeyPox.lat, monkeyPox.lng, monkeyPox.genre, monkeyPox.age);
                    yield emailService.sendEmail({
                        to: "bitfox666@gmail.com",
                        subject: `Detalles de la persona enferma: Género de la persona: ${monkeyPox.genre}, Edad de la persona: ${monkeyPox.age} `,
                        htmlBody: htmlBody
                    });
                    console.log(`Email enviado para el caso con Id: ${monkeyPox._id}`);
                    let updateIncident = {
                        lat: monkeyPox.lat,
                        lng: monkeyPox.lng,
                        genre: monkeyPox.genre,
                        age: monkeyPox.age,
                        isSent: true,
                        creationDate: Date.now()
                    };
                    yield changoModels_1.changoModel.findByIdAndUpdate(monkeyPox._id, updateIncident);
                    console.log(`Caso actualizado para el ID: ${monkeyPox._id}`);
                }
                catch (error) {
                    console.error("Error al procesar el caso.");
                }
            })));
        }
        catch (error) {
            console.error("Error al enviar el correo.");
        }
    }));
};
exports.emailJob = emailJob;
