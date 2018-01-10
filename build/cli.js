#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var yargs = require("yargs");
var moment = require("moment");
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
    .epilogue("Getting your API key:\r\n" +
    "Please follow this link and get your own API key from Alpha Vantage:\r\n" +
    "https://www.alphavantage.co/support/#api-key")
    .argv;
//
// Entry point.
//
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var outputDataSize, interval, dataFrame, dateFormat, api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outputDataSize = "compact";
                    if (argv.outputDataSize) {
                        outputDataSize = argv.outputDataSize;
                    }
                    interval = '60min';
                    if (argv.interval) {
                        interval = argv.interval;
                    }
                    api = new index_1.AlphaVantageAPI(argv.apiKey, outputDataSize, argv.verbose);
                    if (!(argv.type === 'daily')) return [3 /*break*/, 2];
                    return [4 /*yield*/, api.getDailyDataFrame(argv.symbol)];
                case 1:
                    dataFrame = _a.sent();
                    dateFormat = 'YYYY-MM-DD';
                    return [3 /*break*/, 5];
                case 2:
                    if (!(argv.type === 'intraday')) return [3 /*break*/, 4];
                    return [4 /*yield*/, api.getIntradayDataFrame(argv.symbol, interval)];
                case 3:
                    dataFrame = _a.sent();
                    dateFormat = "YYYY-MM-DD HH:mm:ss";
                    return [3 /*break*/, 5];
                case 4: throw new Error("Unexpected data type: " + argv.type + ", expected it to be either 'daily' or 'intrday'");
                case 5:
                    if (!argv.verbose) {
                        console.log('>> ' + argv.out);
                    }
                    dataFrame
                        .transformSeries({
                        Timestamp: function (t) { return moment(t).format(dateFormat); },
                    })
                        .asCSV()
                        .writeFileSync(argv.out);
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (err) {
    console.error("An error occurred.");
    console.error(err && err.stack || err);
});
//# sourceMappingURL=cli.js.map