const request = require('request')

const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiZ3VydTAxIiwiYSI6ImNrNzc1M3BjbzAzMW0zZ3Bqb2w3N2VsbGoifQ.Ylig9qkoR-8AdNfHDwmOrw&limit=1"

    request({ url, json:true },(error,{ body })=>{
        if(error)
        {
            callback("Unable to connect to the weather",undefined)
        }else if(body.features.length === 0){
            callback("Can not find the location.Please try another location",undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode