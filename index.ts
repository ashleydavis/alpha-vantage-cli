
//
// API for downloading data from Alpha Vantage.
//

import * as request from 'request-promise';
var dataForge = require('data-forge');

export class DailyBar {
    Timestamp: Date;
    Open: number;
    High: number;
    Low: number;
    Close: number;
    Volume: number;
    AdjClose: number;
    DividendAmount: number;
    SplitCoefficient: number;
}

export class IntradayBar {
    Timestamp: Date;
    Open: number;
    High: number;
    Low: number;
    Close: number;
    Volume: number;
}

export class AlphaVantageAPI {

    //
    // Your Alpha Vantage API key.
    //
    apiKey: string;

    //
    // The data size to output:
    //      full
    //      compact
    //
    //
    outputDataSize: string;

    //
    // Enables verbose mode with logging.
    //
    verbose: boolean;

    private baseUrl = "https://www.alphavantage.co";

    constructor(apiKey: string, outputDataSize: string, verbose: boolean | undefined) {
        this.apiKey = apiKey;
        this.outputDataSize = outputDataSize;
        this.verbose = verbose !== undefined ? verbose : false;
    }

    //
    // Retreive stock data from Alpha Vantage.
    //
    async getDailyDataFrame(symbol: string): Promise<any> {
        var url = this.baseUrl + "/query" + 
            "?function=TIME_SERIES_DAILY_ADJUSTED" + 
            "&symbol=" + symbol + 
            "&apikey=" + this.apiKey + 
            "&datatype=csv" +
            "&outputsize=" + this.outputDataSize
            ;
            
        if (this.verbose) {
            console.log('<< ' + url);
        }

        var response = await request(url);
        if (response.indexOf("Error Message") >= 0) {
            throw new Error(JSON.parse(response)["Error Message"]);
        }

        return dataForge
            .fromCSV(response, { skipEmptyLines: true })
            .parseDates("timestamp", "YYYY-MM-DD")
            .parseFloats(["open", "high", "low", "close", "adjusted_close", "volume", "dividend_amount" , "split_coefficient"])
            .renameSeries({
                timestamp: "Timestamp",
                open: "Open",
                high: "High",
                low: "Low",
                close: "Close",
                adjusted_close: "AdjClose",
                volume: "Volume",
                dividend_amount: "DividendAmount",
                split_coefficient: "SplitCoefficient",
            })
            .bake();
    }    
    //
    // Retreive stock data from Alpha Vantage.
    //
    async getDailyData(symbol: string): Promise<DailyBar[]> {
        var bars = (await this.getDailyDataFrame(symbol)).toArray();
        return bars;
    }

    //
    // Retreive stock data from Alpha Vantage.
    //
    async getIntradayDataFrame(symbol: string, interval: string): Promise<any> {
        var url = this.baseUrl + "/query" + 
            "?function=TIME_SERIES_INTRADAY" + 
            "&symbol=" + symbol + 
            "&apikey=" + this.apiKey + 
            "&datatype=csv" +
            "&outputsize=" + this.outputDataSize  +
            "&interval=" + interval            
            ;

        if (this.verbose) {
            console.log('<< ' + url);
        }

        var response = await request(url);
        if (response.indexOf("Error Message") >= 0) {
            throw new Error(JSON.parse(response)["Error Message"]);
        }

        return dataForge
            .fromCSV(response, { skipEmptyLines: true })
            .parseDates("timestamp", "YYYY-MM-DD HH:mm:ss")
            .parseFloats(["open", "high", "low", "close", "volume"])
            .renameSeries({
                timestamp: "Timestamp",
                open: "Open",
                high: "High",
                low: "Low",
                close: "Close",
                volume: "Volume",
            })
            .bake();
    }

    //
    // Retreive stock data from Alpha Vantage.
    //
    async getIntradayData(symbol: string, interval: string): Promise<IntradayBar[]> {
        var bars = (await this.getIntradayDataFrame(symbol, interval)).toArray();
        return bars;
    }
};
