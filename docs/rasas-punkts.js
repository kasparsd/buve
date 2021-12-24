const A = 17.625
const B = 243.12

function surfaceTemperatureAt(airTemperature, airHumidity) {
    return B * (Math.log(airHumidity) + ((A * airTemperature) / (B + airTemperature))) / (A - Math.log(airHumidity) - ((A * airTemperature) / (B + airTemperature)))
}

function airTemperatureAt(surfaceTemperature, airHumidity) {
    return B * (((A * surfaceTemperature) / (B + surfaceTemperature)) - Math.log(airHumidity)) / (A + Math.log(airHumidity) - ((A * surfaceTemperature) / (B + surfaceTemperature)))
}

function airHumidityAt(airTemperature, surfaceTemperature) {
    return Math.exp((A * surfaceTemperature) / (B + surfaceTemperature)) / Math.exp((A * airTemperature) / (B + airTemperature))
}

function roundTo(value, decimalPlaces) {
    if (decimalPlaces) {
        const rate = Math.pow(10, decimalPlaces);
        
        return Math.round(value * rate) / rate;
    }

    return Math.round(value);
}

export {
    surfaceTemperatureAt,
    airTemperatureAt,
    airHumidityAt,
    roundTo
}