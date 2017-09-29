export declare class DailyBar {
}
export declare class IntradayBar {
}
export declare class AlphaVantageAPI {
    apiKey: string;
    outputDataSize: string;
    verbose: boolean;
    private baseUrl;
    constructor(apiKey: string, outputDataSize: string, verbose: boolean);
    getDailyData(symbol: string): Promise<DailyBar[]>;
    getIntradayData(symbol: string, interval: string): Promise<IntradayBar[]>;
}
