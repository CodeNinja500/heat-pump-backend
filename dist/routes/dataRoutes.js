"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dataRoutes;
const express_1 = require("express");
const temperatureController_1 = require("../controllers/temperatureController");
const compressorController_1 = require("../controllers/compressorController");
const fanController_1 = require("../controllers/fanController");
const defrostController_1 = require("../controllers/defrostController");
function dataRoutes(db) {
    const router = (0, express_1.Router)();
    // TEMPERATURE
    // Store temperature data in the database
    router.post("/temperature", (req, res) => {
        const value = req.body.value;
        (0, temperatureController_1.storeTemperature)(db, value)
            .then(() => res.status(201).send("Data stored."))
            .catch((err) => res.status(500).send(err.message));
    });
    // Get temperature data from the database
    router.get("/temperature", (req, res) => {
        (0, temperatureController_1.getTemperatureData)(db)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).send(err.message));
    });
    //COMPRESSOR
    // Store compressor data in the database
    router.post("/compressor", (req, res) => {
        const value = req.body.value;
        (0, compressorController_1.storeCompressorStatus)(db, value)
            .then(() => res.status(201).send("Data stored."))
            .catch((err) => res.status(500).send(err.message));
    });
    // Get compressor data from the database
    router.get("/compressor", (req, res) => {
        (0, compressorController_1.getCompressorStatus)(db)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).send(err.message));
    });
    //FAN
    // Store fan data in the database
    router.post("/fan", (req, res) => {
        const value = req.body.value;
        (0, fanController_1.storeVentilatorStatus)(db, value)
            .then(() => res.status(201).send("Data stored."))
            .catch((err) => res.status(500).send(err.message));
    });
    // Get fan data from the database
    router.get("/fan", (req, res) => {
        (0, fanController_1.getVentilatorStatus)(db)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).send(err.message));
    });
    //DEFROSTER
    // Store defrost data in the database
    router.post("/defrost", (req, res) => {
        const value = req.body.value;
        (0, defrostController_1.storeDefrostStatus)(db, value)
            .then(() => res.status(201).send("Data stored."))
            .catch((err) => res.status(500).send(err.message));
    });
    // Get defrost data from the database
    router.get("/defrost", (req, res) => {
        (0, defrostController_1.getDefrostStatus)(db)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).send(err.message));
    });
    return router;
}
