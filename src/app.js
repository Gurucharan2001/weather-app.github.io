const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

const app = express()
/*
console.log(__dirname)
console.log(__filename)
*/

//define paths for express config
const dirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
//setup the path for partials
const partialPath = path.join(__dirname,'../templates/partials')

//setup handelbars engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)

//setup the the partial location
hbs.registerPartials(partialPath)

//setup the static path
app.use(express.static(dirPath))

//home page request
app.get('',(req,res)=>{
    res.render('index',{
        name:'Gurucharan',
        title:'index',
        app_name:"Weather",
        details:'Home page of the app',
        credits:"Created by"
    })
})
//about page request
app.get('/about',(req,res)=>{
    res.render('about',{
        details:"It's all about Gurucharan",
        title:'about',
        name:"Gurucharan",
        credits:"Created by"
    })
})

app.get('/about/*',(req,res)=>{
    res.send('About content not found')
})
//help page request
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        mobile_no:7076431876,
        name:"Gurucharan",
        details:'Help page of the app',
        credits:"Created by"
    })
})

app.get('/help/*',(req,res)=>{
   // res.send('Help content not found')
   res.render('404',{
       title:'Not Found',
       contant:'Help artical not found!!'
   })
})

//login page request!
app.get('/login',(req,res)=>{
    res.render('login',{
        title:'login',
        content:'Loin to join us!'
    })
})

//weather request!!!
app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error:"Please Enter an address!!"
        })
    }
    else{
        geocode(address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({
                    error:"Unable to find location.Please try another location!"
                })
            }
    
            forecast(latitude,longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error:"Forecast not found"
                    })
                }
                res.send({
                    location:location,
                    forecast:forecastData
                })
                /*
                console.log("Location:"+location)
                console.log(forecastData)*/
            })
        })
    }
})




app.get('*',(req,res)=>{
    //res.send("My 404 Page!!!")
    res.render('404',{
        contant:'Page not found',
        title:404
    })
})

app.listen(3000,()=>{
    console.log("The server is up on port localhost:3000")
})