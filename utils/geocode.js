const request = require('postman-request');

const MAPBOX_BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const MAPBOX_ACCESS_KEY= 'pk.eyJ1Ijoiemh1YmluZ2JpbmcyMTEzIiwiYSI6ImNrY3c4eHFvYjBicmcycm1wNml2cGF5amEifQ.jTwaerCQZpVggh4p9VGz7Q';
const MAPBOX_CONFIG = {
    limit: 1,
}
const { limit } = MAPBOX_CONFIG;

const geocode = (address, callback) => {
    const encodeAddress = encodeURIComponent(address);
    const url = `${MAPBOX_BASE_URL}/${encodeAddress}.json?access_token=${MAPBOX_ACCESS_KEY}&limit=${limit}`;

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location service!');
        } else if (body.features.length === 0) {
            callback('Unable to find location!');
        } else {
            const geoLocation = body.features[0].center;
            const location = body.features[0].place_name;
            const latitude = geoLocation[1];
            const longitude = geoLocation[0];
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    })
}

module.exports = geocode;