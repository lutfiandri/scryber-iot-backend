const sensorsAverage = (sensors, timeEnd) => {
  const n = sensors.length;

  const total = {
    time_end_at: timeEnd,
    e_current: 0,
    gas_produced: 0,
    gas_used: 0,
    humidity: 0,
    ph: 0,
    slurry_height: 0,
    temperature: 0,
    viscosity: 0,
  };

  if (n === 0) return total;

  sensors.forEach((sensor) => {
    total.e_current += sensor.e_current;
    total.gas_produced += sensor.gas_produced;
    total.gas_used += sensor.gas_used;
    total.humidity += sensor.humidity;
    total.ph += sensor.ph;
    total.slurry_height += sensor.slurry_height;
    total.temperature += sensor.temperature;
    total.viscosity += sensor.viscosity;
  });

  const average = {
    time_end_at: total.time_end_at,
    e_current: total.e_current / n,
    gas_produced: total.gas_produced / n,
    gas_used: total.gas_used / n,
    humidity: total.humidity / n,
    ph: total.e_current / n,
    slurry_height: total.slurry_height / n,
    temperature: total.temperature / n,
    viscosity: total.viscosity / n,
  };

  return average;
};

module.exports = sensorsAverage;
