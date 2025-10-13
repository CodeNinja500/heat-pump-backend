"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeVentilatorStatus = storeVentilatorStatus;
exports.getVentilatorStatus = getVentilatorStatus;
async function storeVentilatorStatus(db, status) {
    const timestamp = new Date().toISOString(); // Add server timestamp
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO ventilator (status, timestamp) VALUES (?, ?)', [Number(status), timestamp], (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
async function getVentilatorStatus(db) {
    return new Promise((resolve, reject) => {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // Last 24 hours
        db.all('SELECT * FROM ventilator WHERE timestamp >= ? ORDER BY timestamp ASC', [since], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
