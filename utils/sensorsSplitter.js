function sensorsSplitter(raw) {
  const arrayData = raw.split(',').map((data) => Number(data));
  const data = {
    e_current: arrayData[0],
    gas_produced: arrayData[1],
    gas_used: arrayData[2],
    humidity: arrayData[3],
    ph: arrayData[4],
    slurry_height: arrayData[5],
    temperature: arrayData[6],
    viscosity: arrayData[7],
  };
  return data;
}

module.exports = sensorsSplitter;

/**
 * Urutan Data:
 * 0. e_current
 * 1. gas_produced
 * 2. gas_used
 * 3. humidity
 * 4. ph
 * 5. slurry_height
 * 6. temperature
 * 7. viscosity
 */
