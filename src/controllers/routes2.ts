import { Router } from "express";
import { changoRutas } from "./routes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();
        router.use("/api/changoCasos", changoRutas.routes);
        return router;
    }
}