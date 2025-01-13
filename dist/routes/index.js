"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = modbusRoutes;
const express_1 = require("express");
const dataRoutes_1 = __importDefault(require("./dataRoutes"));
function modbusRoutes(db) {
    const router = (0, express_1.Router)();
    // Add data routes
    router.use("/data", (0, dataRoutes_1.default)(db));
    return router;
}
