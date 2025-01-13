"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const index_1 = __importDefault(require("./routes/index"));
const modbus_1 = require("./modbus");
const temperatureController_1 = require("./controllers/temperatureController");
const compressorController_1 = require("./controllers/compressorController");
const fanController_1 = require("./controllers/fanController");
const defrostController_1 = require("./controllers/defrostController");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(express_1.default.json());
// CORS
app.use((0, cors_1.default)({
    origin: "http://localhost:4200", // Replace with your Angular app's domain
}));
// Initialize database
const db = (0, database_1.initializeDatabase)();
// Use routes
app.use("/api", (0, index_1.default)(db));
// Schedule Modbus Data Collection
setInterval(async () => {
    const temperature = (0, modbus_1.readTemperatureFromModbus)();
    console.log("Temperature from Modbus:", temperature);
    const ventilatorStatus = (0, modbus_1.readVentilatorStatusFromModbus)();
    console.log("Fan status from Modbus:", ventilatorStatus);
    const compressorStatus = (0, modbus_1.readCompressorStatusFromModbus)();
    console.log("Compressor status from Modbus:", compressorStatus);
    const defrosterStatus = (0, modbus_1.readDefrostStatusFromModbus)();
    console.log("Defroster status from Modbus:", defrosterStatus);
    try {
        await (0, temperatureController_1.storeTemperature)(db, temperature);
        console.log("Stored temperature value in the database:", temperature);
    }
    catch (err) {
        console.error("Failed to store temperature in database:", err.message);
    }
    try {
        await (0, compressorController_1.storeCompressorStatus)(db, compressorStatus);
        console.log("Stored compressor status in the database:", compressorStatus);
    }
    catch (err) {
        console.error("Failed to store compressor status in database:", err.message);
    }
    try {
        await (0, fanController_1.storeVentilatorStatus)(db, ventilatorStatus);
        console.log("Stored ventilator status in the database:", ventilatorStatus);
    }
    catch (err) {
        console.error("Failed to store ventilator status in database:", err.message);
    }
    try {
        await (0, defrostController_1.storeDefrostStatus)(db, defrosterStatus);
        console.log("Stored defrost status in the database:", defrosterStatus);
    }
    catch (err) {
        console.error("Failed to store defrost status in database:", err.message);
    }
}, 10 * 1000); // 5 minutes in milliseconds
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
