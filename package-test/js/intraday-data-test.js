'use strict';

var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI;

var yourApiKey = 'demo';
var alphaVantageAPI = new AlphaVantageAPI(yourApiKey, 'compact', true);

alphaVantageAPI.getIntradayData('MSFT', '15min')
    .then(intradayData => {
        console.log("Intraday data:");
        console.log(intradayData);
    })
    .catch(err => {
        console.error(err);
    });