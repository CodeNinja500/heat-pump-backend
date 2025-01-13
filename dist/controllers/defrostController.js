"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeDefrostStatus = storeDefrostStatus;
exports.getDefrostStatus = getDefrostStatus;
async function storeDefrostStatus(db, status) {
    const timestamp = new Date().toISOString(); // Add server timestamp
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO defroster (status, timestamp) VALUES (?, ?)", [Number(status), timestamp], (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
async function getDefrostStatus(db) {
    return new Promise((resolve, reject) => {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // Last 24 hours
        db.all("SELECT * FROM defroster WHERE timestamp >= ? ORDER BY timestamp ASC", [since], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
