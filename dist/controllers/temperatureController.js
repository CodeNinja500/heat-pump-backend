"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeTemperature = storeTemperature;
exports.getTemperatureData = getTemperatureData;
async function storeTemperature(db, value) {
    const timestamp = new Date().toISOString(); // Add server timestamp
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO temperature (value, timestamp) VALUES (?, ?)", [value, timestamp], (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
async function getTemperatureData(db) {
    return new Promise((resolve, reject) => {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // Last 24 hours
        db.all("SELECT * FROM temperature WHERE timestamp >= ? ORDER BY timestamp ASC", [since], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
