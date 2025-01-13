import { Router } from "express";
import { storeTemperature, getTemperatureData } from "../controllers/temperatureController";
import { getCompressorStatus, storeCompressorStatus } from "../controllers/compressorController";
import { getVentilatorStatus, storeVentilatorStatus } from "../controllers/fanController";
import { getDefrostStatus, storeDefrostStatus } from "../controllers/defrostController";

export default function dataRoutes(db: any) {
    const router = Router();

    // TEMPERATURE
    // Store temperature data in the database
    router.post("/temperature", (req, res) => {
        const value = req.body.value;
        storeTemperature(db, value)
            .then(() => res.status(201).send("Data stored."))
            .catch((err: Error) => res.status(500).send(err.message));
    });

    // Get temperature data from the database
    router.get("/temperature", (req, res) => {
        getTemperatureData(db)
            .then((data: any) => res.json(data))
            .catch((err: Error) => res.status(500).send(err.message));
    });

    //COMPRESSOR
    // Store compressor data in the database
    router.post("/compressor", (req, res) => {
        const value = req.body.value;
        storeCompressorStatus(db, value)
            .then(() => res.status(201).send("Data stored."))
            .catch((err: Error) => res.status(500).send(err.message));
    });

    // Get compressor data from the database
    router.get("/compressor", (req, res) => {
        getCompressorStatus(db)
            .then((data: any) => res.json(data))
            .catch((err: Error) => res.status(500).send(err.message));
    });

    //FAN
    // Store fan data in the database
    router.post("/fan", (req, res) => {
        const value = req.body.value;
        storeVentilatorStatus(db, value)
            .then(() => res.status(201).send("Data stored."))
            .catch((err: Error) => res.status(500).send(err.message));
    });

    // Get fan data from the database
    router.get("/fan", (req, res) => {
        getVentilatorStatus(db)
            .then((data: any) => res.json(data))
            .catch((err: Error) => res.status(500).send(err.message));
    });

    //DEFROSTER
    // Store defrost data in the database
    router.post("/defrost", (req, res) => {
        const value = req.body.value;
        storeDefrostStatus(db, value)
            .then(() => res.status(201).send("Data stored."))
            .catch((err: Error) => res.status(500).send(err.message));
    });

    // Get defrost data from the database
    router.get("/defrost", (req, res) => {
        getDefrostStatus(db)
            .then((data: any) => res.json(data))
            .catch((err: Error) => res.status(500).send(err.message));
    });

    return router;
}
