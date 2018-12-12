//  Modules
const express = require('express');
const weather = require('./weather-api');
const bodyParser = require('body-parser'); 
const appConfig = require('./config.json');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(appConfig.port, () => console.log(`Running on port ${appConfig.port}`));

//  Routes
app.get('/', function(req, res){
    res.render('home');
});

app.post('/search/', function(req, res){
    try{
        weather.getWeatherInfo(req.body.city).then(d => {
            if (!d) return console.log("No Response Data");
       
            res.render('weather', {
                data: d
            });
        })
        .catch(e => res.render('error', { error: e}))
    } catch(e){
        console.log(`Error: ${e}`);
    }
});