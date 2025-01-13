"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTemperatureFromModbus = readTemperatureFromModbus;
exports.readCompressorStatusFromModbus = readCompressorStatusFromModbus;
exports.readVentilatorStatusFromModbus = readVentilatorStatusFromModbus;
exports.readDefrostStatusFromModbus = readDefrostStatusFromModbus;
function readTemperatureFromModbus() {
    // Simulate Modbus data: Random value between 20 and 36
    const simulatedValue = Math.floor(Math.random() * (36 - 20 + 1)) + 20;
    console.log("Temparature value:", simulatedValue);
    return simulatedValue;
}
function getRandomBooleanValue() {
    return Math.random() >= 0.5;
}
function readCompressorStatusFromModbus() {
    // Simulate Modbus data: Random boolean value
    const simulatedValue = getRandomBooleanValue();
    console.log("Compressor status:", simulatedValue);
    return simulatedValue;
}
function readVentilatorStatusFromModbus() {
    // Simulate Modbus data: Random boolean value
    const simulatedValue = getRandomBooleanValue();
    console.log("Ventilator status:", simulatedValue);
    return simulatedValue;
}
function readDefrostStatusFromModbus() {
    // Simulate Modbus data: Random boolean value
    const simulatedValue = getRandomBooleanValue();
    console.log("Defrost status:", simulatedValue);
    return simulatedValue;
}
