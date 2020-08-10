const request = require('postman-request');

const WEATHER_STACK_BASE_URL = 'http://api.weatherstack.com';
const WEATHER_STACK_ACCESS_KEY = '79bc7173acff50905ed7d3c9018545e6';
const WEATHER_STACK_CONFIG = {
    unit: 'f'
}
const { unit } = WEATHER_STACK_CONFIG;

const forecast = (latitude, longitude, callback) => {
    const query = `${latitude},${longitude}`;
    const url = `${WEATHER_STACK_BASE_URL}/current?access_key=${WEATHER_STACK_ACCESS_KEY}&query=${query}&units=${unit}`;
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!');
        } else if (body.error) {
            callback('Unable to find location!');
        } else {
            const informarion = body.current;
            const { temperature, feelslike, weather_descriptions } = informarion;
            const result = `${weather_descriptions} It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out!`
            callback(undefined, result);
        }
    })
}

module.exports = forecast;