const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = "https://api.darksky.net/forecast/32c7698f39adbc0d7bd2c4e14f914eb2/"+longitude+","+latitude
    
    request({ url,json:true },(error,{body})=>{
        if(error){
            callback("Please check your internate connection",undefined)
        }else if(body.error){
            callback("Unable to find the location",undefined)
        }else{
            callback(undefined,
                /*{
                    summary:response.body.daily.data[0].summary,
                    temparature:response.body.currently.temperature,
                    precipProbability:response.body.currently.precipProbability
                }*/
                (body.daily.data[0].summary+"It is Currently "+body.currently.temperature+" degrees. There is a "+body.currently.precipProbability+"% of chance of rain.The lowest temparature is "+body.daily.data[0].temperatureLow+" and the highest temparature is "+body.daily.data[0].temperatureHigh)
            )
        }

    })
}



module.exports = forecast