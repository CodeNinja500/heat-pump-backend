"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
const sqlite3_1 = __importDefault(require("sqlite3"));
function initializeDatabase() {
    const db = new sqlite3_1.default.Database('data.db');
    db.run(`
        CREATE TABLE IF NOT EXISTS temperature (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            value REAL,
            timestamp DATETIME
        );
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        }
        else {
            console.log('Table "temperature" is ready.');
        }
    });
    db.run(`
        CREATE TABLE IF NOT EXISTS compressor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status INTEGER,
            timestamp DATETIME
        );
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        }
        else {
            console.log('Table "compressor" is ready.');
        }
    });
    db.run(`
        CREATE TABLE IF NOT EXISTS ventilator (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status INTEGER,
            timestamp DATETIME
        );
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        }
        else {
            console.log('Table "ventilator" is ready.');
        }
    });
    db.run(`
        CREATE TABLE IF NOT EXISTS defroster (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status INTEGER,
            timestamp DATETIME
        );
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        }
        else {
            console.log('Table "defroster" is ready.');
        }
    });
    return db;
}
