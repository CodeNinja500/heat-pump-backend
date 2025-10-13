"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModbusRouter = createModbusRouter;
const express_1 = __importDefault(require("express"));
function createModbusRouter(dataService) {
    const router = express_1.default.Router();
    // Temperature
    router.get('/temperature', (req, res) => {
        const limit = parseInt(req.query.limit) || 200;
        res.json(dataService.getRecentTemperature(limit));
    });
    // Compressor
    router.get('/compressor', (req, res) => {
        const limit = parseInt(req.query.limit) || 200;
        res.json(dataService.getRecentCompressor(limit));
    });
    // Ventilator
    router.get('/ventilator', (req, res) => {
        const limit = parseInt(req.query.limit) || 200;
        res.json(dataService.getRecentVentilator(limit));
    });
    // Defroster
    router.get('/defroster', (req, res) => {
        const limit = parseInt(req.query.limit) || 200;
        res.json(dataService.getRecentDefroster(limit));
    });
    return router;
}
