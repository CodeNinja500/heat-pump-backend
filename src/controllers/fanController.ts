export async function storeVentilatorStatus(db: any, status: boolean): Promise<void> {
  const timestamp = new Date().toISOString(); // Add server timestamp
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO ventilator (status, timestamp) VALUES (?, ?)',
      [Number(status), timestamp],
      (err: Error | null) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

export async function getVentilatorStatus(db: any): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // Last 24 hours
    db.all(
      'SELECT * FROM ventilator WHERE timestamp >= ? ORDER BY timestamp ASC',
      [since],
      (err: Error | null, rows: any[]) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}
