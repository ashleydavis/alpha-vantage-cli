#!/usr/bin/env node

//
// Command line app for downloading data from Alpha Vantage.
//

import { DailyBar, IntradayBar, AlphaVantageAPI } from './index';
import { argv } from 'yargs';
import * as moment from 'moment';

//
// Entry point.
//
async function main(): Promise<void> {

    if (!argv.type) {
        console.error("Missing --type=<data-type> on the command line.");
        process.exit(1);
    }

    if (!argv.symbol) {
        console.error("Missing --symbol=<your-symbol> on the command line.");
        process.exit(1);
    }

    if (!argv.apiKey) {
        console.error("Missing --api-key=<alpha-vantage-api-key> on the command line.");
        process.exit(1);
    }

    if (!argv.out) {
        console.error("Missing --out=<output-csv-file> on the command line.");
        process.exit(1);
    }

    var outputDataSize = "compact";
    if (argv.outputDataSize) {
        outputDataSize = argv.outputDataSize;
    }
    
    var interval = '60min';
    if (argv.interval) {
        interval = argv.interval;
    }

    var dataFrame: any; //TODO: Should be typed to a DataFrame.
    var dateFormat: string;

    var api = new AlphaVantageAPI(argv.apiKey, outputDataSize, argv.verbose);
    if (argv.type === 'daily') {
        dataFrame = await api.getDailyDataFrame(argv.symbol);
        dateFormat = 'YYYY-MM-DD';
    }
    else if (argv.type === 'intraday') {
        dataFrame = await api.getIntradayDataFrame(argv.symbol, interval);
        dateFormat = "YYYY-MM-DD HH:mm:ss";
    }
    else {
        throw new Error("Unexpected data type: " + argv.type + ", expected it to be either 'daily' or 'intrday'");
    }

    if (!argv.verbose) {
        console.log('>> ' + argv.out);
    }
    dataFrame
        .transformSeries({
            Timestamp: (t: Date) => moment(t).format(dateFormat),
        })
        .asCSV()
        .writeFileSync(argv.out);
}

main()
    .catch(err => {
        console.error("An error occurred.");
        console.error(err && err.stack || err);
    });