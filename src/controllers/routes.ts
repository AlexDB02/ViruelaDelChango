import { Router } from "express";
import { viruelaController } from "./controller";

export class changoRutas{

    static get routes(): Router{
        const router = Router();
        const controller = new viruelaController();

        router.get("/", controller.getCasos);
        router.post("/", controller.crearCaso);
        router.get("/last-week", controller.get7dias);
        router.put("/:id", controller.actualizarCaso);
        router.delete("/:id", controller.eliminarCaso);
        return router;
    }
}