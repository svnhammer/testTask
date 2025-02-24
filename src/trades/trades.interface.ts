export interface ITradeEntry {
    id: number;
    price: number;
    qty: number;
    quoteQty: number;
    time: number;
    isBuyerMaker: boolean;
    isBestMatch: boolean;
}