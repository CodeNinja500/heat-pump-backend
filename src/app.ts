import express from "express";
import { initializeDatabase } from "./database";
import modbusRoutes from "./routes/index";
import {
    readCompressorStatusFromModbus,
    readDefrostStatusFromModbus,
    readTemperatureFromModbus,
    readVentilatorStatusFromModbus,
} from "./modbus";
import { storeTemperature } from "./controllers/temperatureController";
import { storeCompressorStatus } from "./controllers/compressorController";
import { storeVentilatorStatus } from "./controllers/fanController";
import { storeDefrostStatus } from "./controllers/defrostController";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// CORS
app.use(
    cors({
        origin: "http://localhost:4200", // Replace with your Angular app's domain
    })
);

// Initialize database
const db = initializeDatabase();

// Use routes
app.use("/api", modbusRoutes(db));

// Schedule Modbus Data Collection
setInterval(async () => {
    const temperature = readTemperatureFromModbus();
    console.log("Temperature from Modbus:", temperature);
    const ventilatorStatus = readVentilatorStatusFromModbus();
    console.log("Fan status from Modbus:", ventilatorStatus);
    const compressorStatus = readCompressorStatusFromModbus();
    console.log("Compressor status from Modbus:", compressorStatus);
    const defrosterStatus = readDefrostStatusFromModbus();
    console.log("Defroster status from Modbus:", defrosterStatus);

    try {
        await storeTemperature(db, temperature);
        console.log("Stored temperature value in the database:", temperature);
    } catch (err: any) {
        console.error("Failed to store temperature in database:", err.message);
    }

    try {
        await storeCompressorStatus(db, compressorStatus);
        console.log("Stored compressor status in the database:", compressorStatus);
    } catch (err: any) {
        console.error("Failed to store compressor status in database:", err.message);
    }

    try {
        await storeVentilatorStatus(db, ventilatorStatus);
        console.log("Stored ventilator status in the database:", ventilatorStatus);
    } catch (err: any) {
        console.error("Failed to store ventilator status in database:", err.message);
    }

    try {
        await storeDefrostStatus(db, defrosterStatus);
        console.log("Stored defrost status in the database:", defrosterStatus);
    } catch (err: any) {
        console.error("Failed to store defrost status in database:", err.message);
    }
}, 10 * 1000); // 5 minutes in milliseconds

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
