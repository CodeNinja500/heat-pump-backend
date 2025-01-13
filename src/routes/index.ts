import { Router } from "express";
import dataRoutes from "./dataRoutes";

export default function modbusRoutes(db: any) {
    const router = Router();

    // Add data routes
    router.use("/data", dataRoutes(db));

    return router;
}
