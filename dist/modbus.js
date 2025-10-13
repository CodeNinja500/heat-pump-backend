"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTemperatureFromModbus = readTemperatureFromModbus;
exports.readCompressorStatusFromModbus = readCompressorStatusFromModbus;
exports.readFanStatusFromModbus = readFanStatusFromModbus;
exports.readDefrostStatusFromModbus = readDefrostStatusFromModbus;
async function readTemperatureFromModbus() {
    return 20 + Math.random() * 10;
}
async function readCompressorStatusFromModbus() {
    return Math.random() > 0.5;
}
async function readFanStatusFromModbus() {
    return Math.random() > 0.5;
}
async function readDefrostStatusFromModbus() {
    return Math.random() > 0.5;
}
