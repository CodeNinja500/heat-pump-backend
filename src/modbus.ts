function getRandomBooleanValue(): boolean {
    return Math.random() >= 0.5;
}

export function readTemperatureFromModbus(): number {
    // Simulate Modbus data: Random value between 20 and 36
    const simulatedValue = Math.floor(Math.random() * (36 - 20 + 1)) + 20;
    console.log("Temparature value:", simulatedValue);
    return simulatedValue;
}

export function readCompressorStatusFromModbus(): boolean {
    // Simulate Modbus data: Random boolean value
    const simulatedValue = getRandomBooleanValue();
    console.log("Compressor status:", simulatedValue);
    return simulatedValue;
}

export function readVentilatorStatusFromModbus(): boolean {
    // Simulate Modbus data: Random boolean value
    const simulatedValue = getRandomBooleanValue();
    console.log("Ventilator status:", simulatedValue);
    return simulatedValue;
}

export function readDefrostStatusFromModbus(): boolean {
    // Simulate Modbus data: Random boolean value
    const simulatedValue = getRandomBooleanValue();
    console.log("Defrost status:", simulatedValue);
    return simulatedValue;
}
