const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=bc926d78f1735fff20ee3ea2fffcd7ad&units=metric';

    request({url: url, json: true }, (error, response)=> {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }else if (response.body.cod) {
            callback('Unable to get location', undefined)
        } else {
            const description = response.body.daily[0].weather[0].description
            const temperature = response.body.current.temp

            callback(undefined, description + ' and it is '+ temperature + ' degrees');        
        }
    
    });
}

module.exports = forecast;



