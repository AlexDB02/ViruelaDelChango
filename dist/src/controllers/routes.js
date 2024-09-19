"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changoRutas = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class changoRutas {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.viruelaController();
        router.get("/", controller.getCasos);
        router.post("/", controller.crearCaso);
        router.get("/last-week", controller.get7dias);
        router.put("/:id", controller.actualizarCaso);
        router.delete("/:id", controller.eliminarCaso);
        return router;
    }
}
exports.changoRutas = changoRutas;
