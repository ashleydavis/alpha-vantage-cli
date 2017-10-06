#!/usr/bin/env node

//
// Command line app for downloading data from Alpha Vantage.
//

import { DailyBar, IntradayBar, AlphaVantageAPI } from './index';
import * as yargs from 'yargs';
import * as moment from 'moment';
import * as path from 'path';

 var argv = yargs
    .version()
    .usage("alpha-vantage-cli --type=<data-type> --symbol=<instrument-symbol> --api-key=<your-api-key> --out=<output-file>")
    .example("daily", "alpha-vantage-cli --type=daily --symbol=MSFT --api-key=demo --out=./test/MSFT-daily.csv")
    .example("intraday", "alpha-vantage-cli --type=intraday --symbol=MSFT --api-key=demo --interval=15min --out=./test/MSFT-intraday.csv")
    .wrap(yargs.terminalWidth())
    .option('type', {
        alias: 't',
        describe: 'The type of data to retreive (daily or intraday).',
        choices: ['daily', 'intraday'],
        default: 'daily',
        type: 'string',
    })
    .option('symbol', {
        alias: 's',
        describe: 'The company/instrument to retreive data for (eg MSFT).',
        demandOption: true,
        type: 'string',
    })
    .option('api-key', {
        alias: 'k',
        describe: 'Your Alpha Vantage API key. See --help for details.',
        demandOption: true,
        type: 'string',
    })
    .option('out', {
        alias: 'o',
        describe: 'Specifies the name of the output file. Data is written to this file in CSV format.',
        demandOption: true,
        type: 'string',
    })
    .option('output-data-size', {
        describe: 'Specifies the output data size.',
        choices: ["full", "compact"],
        default: "compact",
        type: 'string',
    })
    .option('interval', {
        describe: 'Specifies the interval for intraday data.',
        choices: ["1min", "5min", "15min", "30min", "60min"],
        default: "60min",
        type: 'string',
    })
    .option('verbose', {
        alias: 'v',
        describe: "Print information about what the tool is doing.",
        default: false,
        type: "boolean",
    })
    .help()
    .epilogue(
        "Getting your API key:\r\n" +
        "Please follow this link and get your own API key from Alpha Vantage:\r\n" +
        "https://www.alphavantage.co/support/#api-key"
    )
    .argv
    ;

//
// Entry point.
//
async function main(): Promise<void> {

    //checkArgs();

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