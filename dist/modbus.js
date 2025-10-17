"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectModbus = connectModbus;
exports.readTemperatureFromModbus = readTemperatureFromModbus;
exports.readCompressorStatusFromModbus = readCompressorStatusFromModbus;
exports.readFanStatusFromModbus = readFanStatusFromModbus;
exports.readDefrostStatusFromModbus = readDefrostStatusFromModbus;
// modbus.js
const modbus_serial_1 = __importDefault(require("modbus-serial"));
const client = new modbus_serial_1.default();
client.setTimeout(2000);
let connected = false;
let modbusAvailable = true;
// Connect once at startup
async function connectModbus() {
    if (!modbusAvailable)
        return false;
    if (connected)
        return true;
    try {
        await client.connectRTUBuffered('/dev/ttyS5', {
            baudRate: 9600,
            dataBits: 8,
            stopBits: 1,
            parity: 'none'
        });
        client.setID(1); // replace with your heat pump Modbus address
        connected = true;
        console.log('Connected to Modbus device');
        return true;
    }
    catch (err) {
        console.warn('⚠️  Modbus connection failed:', err.message);
        modbusAvailable = false;
        return false;
    }
}
async function readTemperatureFromModbus() {
    const ok = await connectModbus();
    if (!ok) {
        console.warn('⚠️  No data because of Modbus connection fail');
        return 0;
    }
    try {
        console.log('Trying to read temperature');
        const res = await client.readHoldingRegisters(118, 1);
        const value = res.data[0];
        console.log('Temperature value:', value);
        return value;
    }
    catch (err) {
        console.error('❌ Failed to read temperature from Modbus:', err.message || err);
        return 0; // or maybe NaN/null, depending on your logic
    }
}
async function readCompressorStatusFromModbus() {
    const ok = await connectModbus();
    if (!ok) {
        console.warn('⚠️  No data because of Modbus connection fail');
        return false;
    }
    try {
        const res = await client.readCoils(80, 1);
        const value = res.data[0];
        console.log('Compressor status:', value);
        return value;
    }
    catch (err) {
        console.error('❌ Failed to read temperature from Modbus:', err.message || err);
        return false; // or maybe NaN/null, depending on your logic
    }
}
async function readFanStatusFromModbus() {
    const ok = await connectModbus();
    if (!ok) {
        console.warn('⚠️  No data because of Modbus connection fail');
        return false;
    }
    try {
        const res = await client.readCoils(81, 1);
        const value = res.data[0];
        console.log('Ventilator status:', value);
        return value;
    }
    catch (err) {
        console.error('❌ Failed to read temperature from Modbus:', err.message || err);
        return false; // or maybe NaN/null, depending on your logic
    }
}
async function readDefrostStatusFromModbus() {
    const ok = await connectModbus();
    if (!ok) {
        console.warn('⚠️  No data because of Modbus connection fail');
        return false;
    }
    try {
        const res = await client.readCoils(86, 1);
        const value = res.data[0];
        console.log('Defrost status:', value);
        return value;
    }
    catch (err) {
        console.error('❌ Failed to read temperature from Modbus:', err.message || err);
        return false; // or maybe NaN/null, depending on your logic
    }
}
