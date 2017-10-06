'use strict';

import { AlphaVantageAPI } from 'alpha-vantage-cli';

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