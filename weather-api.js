const request = require('request');
const appConfig = require('./config.json');

function getWeatherInfo(cityname) {
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${appConfig.weather_api_key}&units=metric`;

    return new Promise((resolve, reject) => {
        request({
            url: weatherURL,
            json: true,
        }, function(error, response, body){
            if(error) return reject(error);
            if(body.cod === "404") return reject("City Not Found!");
            if(body.cod === 401) return reject("Invalid API Key");
            if(body.cod === "400") return reject("No input was given")
            resolve(body);
        });
    });
};

module.exports = {
    getWeatherInfo
}