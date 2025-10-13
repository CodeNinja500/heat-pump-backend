"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const buffer_service_1 = require("./services/buffer.service");
const dataRoutes_1 = require("./routes/dataRoutes");
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(express_1.default.json());
// CORS
app.use((0, cors_1.default)({
    origin: ['http://localhost:4200', 'http://192.168.0.9'] // Replace with your Angular app's domain
}));
//Initialize DataService
const dataService = new buffer_service_1.DataService();
dataService.start(10000, 48 * 60 * 60 * 1000); // read every 5s, flush every 48h
// Mount the modbus routes
app.use('/api', (0, dataRoutes_1.createModbusRouter)(dataService));
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
