export async function readTemperatureFromModbus(): Promise<number> {
  return 20 + Math.random() * 10;
}
export async function readCompressorStatusFromModbus(): Promise<boolean> {
  return Math.random() > 0.5;
}
export async function readFanStatusFromModbus(): Promise<boolean> {
  return Math.random() > 0.5;
}
export async function readDefrostStatusFromModbus(): Promise<boolean> {
  return Math.random() > 0.5;
}
