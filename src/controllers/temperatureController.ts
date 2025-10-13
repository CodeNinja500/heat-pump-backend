export async function storeTemperature(db: any, value: number): Promise<void> {
  const timestamp = new Date().toISOString(); // Add server timestamp
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO temperature (value, timestamp) VALUES (?, ?)', [value, timestamp], (err: Error | null) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export async function getTemperatureData(db: any): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // Last 24 hours
    db.all(
      'SELECT * FROM temperature WHERE timestamp >= ? ORDER BY timestamp ASC',
      [since],
      (err: Error | null, rows: any[]) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}
