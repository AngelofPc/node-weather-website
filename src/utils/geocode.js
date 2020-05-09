const request = require('request')

// request({ url: geocodeURL, json: true}, (error, response)=>{
    
//     if (error) {
//         console.log('Unable to connect to location service')
//     }else if (response.body.message) {
//         console.log('Unable to get location')
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude);
//     }
    
// })

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5nZWxvZnBjIiwiYSI6ImNrOWlwN25zYTA1OGkzZHRqazBvNG5oeHQifQ.3PDzHdDhQf36Hwp6Q3JsTw&limit=1'

    request({ url: url, json: true}, (error, response)=>{
    
        if (error) {
            callback('Unable to connect to location service', undefined)
        }else if (response.body.message) {
            callback('Unable to get location', undefined)
        } else {
            const latitude = response.body.features[0].center[0]
            const longitude = response.body.features[0].center[1]
            const location = response.body.features[0].place_name
            callback(undefined, data = {
                lat: latitude,
                log: longitude,
                location: location
            });
        }
        
    })
}

module.exports = geocode