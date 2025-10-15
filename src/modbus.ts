// modbus.js
import ModbusRTU from 'modbus-serial';

const client = new ModbusRTU();
let connected = false;
let modbusAvailable = true;

// Connect once at startup
export async function connectModbus() {
  if (!modbusAvailable) return false;
  if (connected) return true;
  try {
    await client.connectRTUBuffered('/dev/ttyS5', {
      baudRate: 9600,
      dataBits: 8,
      stopBits: 1,
      parity: 'none'
    });
    client.setID(1); // replace with your heat pump Modbus address
    connected = true;
    console.log('Connected to Modbus device');
    return true;
  } catch (err: any) {
    console.warn('⚠️  Modbus connection failed:', err.message);
    modbusAvailable = false;
    return false;
  }
}

export async function readTemperatureFromModbus(): Promise<number> {
  const ok = await connectModbus();
  if (!ok) {
    console.warn('⚠️  No data because of Modbus connection fail');
    return 0;
  }
  const res = await client.readHoldingRegisters(118, 1);
  const value = res.data[0];
  console.log('Temperature value:', value);
  return value;
}

export async function readCompressorStatusFromModbus(): Promise<boolean> {
  const ok = await connectModbus();
  if (!ok) {
    console.warn('⚠️  No data because of Modbus connection fail');
    return false;
  }
  const res = await client.readCoils(80, 1);
  const value = res.data[0];
  console.log('Compressor status:', value);
  return value;
}

export async function readFanStatusFromModbus(): Promise<boolean> {
  const ok = await connectModbus();
  if (!ok) {
    console.warn('⚠️  No data because of Modbus connection fail');
    return false;
  }
  const res = await client.readCoils(81, 1);
  const value = res.data[0];
  console.log('Ventilator status:', value);
  return value;
}

export async function readDefrostStatusFromModbus(): Promise<boolean> {
  const ok = await connectModbus();
  if (!ok) {
    console.warn('⚠️  No data because of Modbus connection fail');
    return false;
  }
  const res = await client.readCoils(86, 1);
  const value = res.data[0];
  console.log('Defrost status:', value);
  return value;
}
