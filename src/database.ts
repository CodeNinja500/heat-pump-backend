import sqlite3 from 'sqlite3';

export function initializeDatabase() {
  const db = new sqlite3.Database('data.db');

  db.run(
    `
        CREATE TABLE IF NOT EXISTS temperature (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            value REAL,
            timestamp DATETIME
        );
    `,
    (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "temperature" is ready.');
      }
    }
  );

  db.run(
    `
        CREATE TABLE IF NOT EXISTS compressor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status INTEGER,
            timestamp DATETIME
        );
    `,
    (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "compressor" is ready.');
      }
    }
  );

  db.run(
    `
        CREATE TABLE IF NOT EXISTS ventilator (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status INTEGER,
            timestamp DATETIME
        );
    `,
    (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "ventilator" is ready.');
      }
    }
  );

  db.run(
    `
        CREATE TABLE IF NOT EXISTS defroster (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status INTEGER,
            timestamp DATETIME
        );
    `,
    (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "defroster" is ready.');
      }
    }
  );

  return db;
}
