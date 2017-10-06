'use strict';

var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI;

var yourApiKey = 'demo';
var alphaVantageAPI = new AlphaVantageAPI(yourApiKey, 'compact', true);

alphaVantageAPI.getDailyData('MSFT')
    .then(dailyData => {
        console.log("Daily data:");
        console.log(dailyData);
    })
    .catch(err => {
        console.error(err);
    });