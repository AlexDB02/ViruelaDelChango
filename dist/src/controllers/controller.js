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
Object.defineProperty(exports, "__esModule", { value: true });
exports.viruelaController = void 0;
const changoModels_1 = require("../data/models/changoModels");
class viruelaController {
    constructor() {
        this.getCasos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const casoViruela = yield changoModels_1.changoModel.find();
                return res.json(casoViruela);
            }
            catch (error) {
                return res.json([]);
            }
        });
        this.crearCaso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { lat, lng, genre, age } = req.body;
                const nuevoCaso = yield changoModels_1.changoModel.create({
                    lat: lat,
                    lng: lng,
                    genre: genre,
                    age: age
                });
                res.json(nuevoCaso);
            }
            catch (error) {
                res.json({ message: "Error creando registro" });
            }
        });
        this.get7dias = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const lastWeek = new Date();
                lastWeek.setDate(lastWeek.getDate() - 7);
                const casosViruela = yield changoModels_1.changoModel.find({
                    creationDate: { $gte: lastWeek }
                });
                return res.json(casosViruela);
            }
            catch (error) {
                return res.json({ message: "Ocurrio un error al traer los casos" });
            }
        });
        this.actualizarCaso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { lat, lng, genre, age } = req.body;
                yield changoModels_1.changoModel.findByIdAndUpdate(id, {
                    lat,
                    lng,
                    genre,
                    age
                });
                const casoActualizado = yield changoModels_1.changoModel.findById(id);
                return res.json(casoActualizado);
            }
            catch (error) {
                return res.json({ message: "Ocurrio un error al actualizar un caso" });
            }
        });
        this.eliminarCaso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield changoModels_1.changoModel.findByIdAndDelete(id);
                return res.json({ message: "Caso eleminado" });
            }
            catch (error) {
                return res.json({ message: "Ocurrio un error al eliminar el caso" });
            }
        });
    }
}
exports.viruelaController = viruelaController;
