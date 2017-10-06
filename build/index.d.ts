export declare class DailyBar {
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
export declare class IntradayBar {
    Timestamp: Date;
    Open: number;
    High: number;
    Low: number;
    Close: number;
    Volume: number;
}
export declare class AlphaVantageAPI {
    apiKey: string;
    outputDataSize: string;
    verbose: boolean;
    private baseUrl;
    constructor(apiKey: string, outputDataSize: string, verbose: boolean | undefined);
    getDailyDataFrame(symbol: string): Promise<any>;
    getDailyData(symbol: string): Promise<DailyBar[]>;
    getIntradayDataFrame(symbol: string, interval: string): Promise<any>;
    getIntradayData(symbol: string, interval: string): Promise<IntradayBar[]>;
}
