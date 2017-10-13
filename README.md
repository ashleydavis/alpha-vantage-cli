# alpha-vantage-cli

This is a command line tool and small Node.js API for retreiving data from Alpha Vantage.

You can use this from the command line to download stock data from Alpha Vantage to a CSV file.

You can use it from your Node.js app as a reusable code module.

Data is returned *as is* from [Alpha Vantage](https://www.alphavantage.co/) with no modification.

For more information [please see my blog post on the Data Wrangler](http://www.the-data-wrangler.com/acquiring-stock-market-data-from-alpha-vantage/).

## Getting an Alpha Vantage API key

Alpha Vantage is free, but to use it you must sign up for an API key. Please follow this link to sign up:

[https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)

The examples that follow use the 'demo' API key, please be aware that this has very limited usage.

## Node.js installation

To use this tool you need to have Node.js installed. This is quite straight forward, please see the Node.js web site for more details:

[http://nodejs.org/](http://nodejs.org/)

## Usage from the command line

alpha-vantage-cli's main purpose is to be used from the command line to download stock data to a CSV file.

Once you have Node.js installed you can install the command line tool via npm by running the following command: 

    npm install -g alpha-vantage-cli

This installs the tool globally so that you can run it from any directory.

Minimal usage looks like this:

    alpha-vantage-cli --type=<data-type> --symbol=<code-for-the-instrument> --api-key=<your-api-key> 

Options:

- --type -> The type of data to download (daily or intraday).
- --symbol -> The symbol for the company or instrument you are interested in (eg MSFT)
- --api-key -> Your Alpha Vantage API key.
- --out -> Sets the name of the output file. CSV data is written to this file.

For example to download daily data for Microsoft:

    alpha-vantage-cli --type=daily --symbol=MSFT --api-key=demo --out=MSFT-daily.csv

Or to download intraday data: 

    alpha-vantage-cli --type=intraday --symbol=MSFT --api-key=demo --out=MSFT-intraday.csv

Optional options:

- --output-data-size -> Sets the output data size (full or compact).
- --interval -> Sets the interval for intraday data (1min, 5min, 15min, 30min or 60min)
- --verbose -> Display verbose information while the tool is running.
- --version -> Display the version of the tool.
- --help -> Display help.

## Usage from a Node.js script

alpha-vantage-cli can also be imported into a Node.js script to be used from code.

To use please install locally in your Node.js project using npm as follows:

    npm install --save alpha-vantage-cli

### Usage from JavaScript

Here are examples of use from a JavaScript code file. Don't forget to replace the API key with your own!

#### Daily data

S
#### Intraday data

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

### Usage from TypeScript

Usage from TypeScript is very similar to JavaScript, but with the added advantage of static types and better intellisense in Visual Studio Code!

#### Daily data

    import { AlphaVantageAPI } from 'alpha-vantage-cli';

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

#### Intraday data

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

## How it works

A blog post is coming soon that describes how this works!

# Testing the code from the repository

    ts-node cli.ts --type=daily --symbol=STW.AX --api-key=<put-your-api-key-here> --out=./test.csv

or 

    npm run test:daily
    npm run test:intraday

# TypeScript template

If you are interested to get into TypeScript please take a look at my no-frills minimal Node.js [typescript starter project](https://github.com/ashleydavis/typescript-template).