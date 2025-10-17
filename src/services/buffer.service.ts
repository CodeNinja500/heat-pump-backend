// services/dataService.ts
import { initializeDatabase } from '../database';
import {
  readTemperatureFromModbus,
  readCompressorStatusFromModbus,
  readFanStatusFromModbus,
  readDefrostStatusFromModbus
} from '../modbus';

interface DataEntry<T> {
  value: T;
  timeStamp: string;
}

export class DataService {
  private db = initializeDatabase();

  private temperatureBuffer: DataEntry<number>[] = [];
  private compressorBuffer: DataEntry<boolean>[] = [];
  private ventilatorBuffer: DataEntry<boolean>[] = [];
  private defrosterBuffer: DataEntry<boolean>[] = [];

  private readInterval: NodeJS.Timeout | null = null;
  private flushInterval: NodeJS.Timeout | null = null;

  start(readEveryMs = 5000, flushEveryMs = 48 * 60 * 60 * 1000) {
    console.log(
      `Starting DataService — reading every ${readEveryMs / 1000}s, flushing every ${flushEveryMs / 3600_000}h`
    );

    // Read Modbus data periodically
    this.readInterval = setInterval(async () => {
      console.log('🔄 Reading Modbus data...');
      const now = new Date().toISOString();

      this.temperatureBuffer.push({
        value: await readTemperatureFromModbus(),
        timeStamp: now
      });
      this.compressorBuffer.push({
        value: await readCompressorStatusFromModbus(),
        timeStamp: now
      });
      this.ventilatorBuffer.push({
        value: await readFanStatusFromModbus(),
        timeStamp: now
      });
      this.defrosterBuffer.push({
        value: await readDefrostStatusFromModbus(),
        timeStamp: now
      });
    }, readEveryMs);

    // Periodic flush
    this.flushInterval = setInterval(() => this.flushToDB(), flushEveryMs);

    // Flush on exit
    process.on('SIGINT', async () => {
      console.log('Flushing before shutdown...');
      await this.flushToDB();
      process.exit(0);
    });
  }

  async flushToDB() {
    console.log('Flushing buffers to database...');
    await this.saveEntries('temperature', 'value', this.temperatureBuffer);
    await this.saveEntries('compressor', 'status', this.compressorBuffer);
    await this.saveEntries('ventilator', 'status', this.ventilatorBuffer);
    await this.saveEntries('defroster', 'status', this.defrosterBuffer);

    // clear buffers after saving
    this.temperatureBuffer = [];
    this.compressorBuffer = [];
    this.ventilatorBuffer = [];
    this.defrosterBuffer = [];

    console.log('All buffers flushed to SQLite.');
  }

  private async saveEntries<T>(table: string, valueColumn: string, entries: DataEntry<T>[]) {
    if (entries.length === 0) return;
    const insertSQL = `INSERT INTO ${table} (${valueColumn}, timestamp) VALUES (?, ?)`;

    return new Promise<void>((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('BEGIN TRANSACTION');
        const stmt = this.db.prepare(insertSQL);

        for (const entry of entries) {
          const val = typeof entry.value === 'boolean' ? (entry.value ? 1 : 0) : entry.value;
          stmt.run(val, entry.timeStamp);
        }

        stmt.finalize((err: Error | null) => {
          if (err) {
            this.db.run('ROLLBACK');
            reject(err);
          } else {
            this.db.run('COMMIT');
            resolve();
          }
        });
      });
    });
  }

  // recent readings in RAM (not DB)
  getRecentTemperature(limit = 100) {
    return this.temperatureBuffer.slice(-limit);
  }
  getRecentCompressor(limit = 100) {
    return this.compressorBuffer.slice(-limit);
  }
  getRecentVentilator(limit = 100) {
    return this.ventilatorBuffer.slice(-limit);
  }
  getRecentDefroster(limit = 100) {
    return this.defrosterBuffer.slice(-limit);
  }
}
