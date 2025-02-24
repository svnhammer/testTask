import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TradeEntry, TradeEntryDocument } from 'src/repository/repository.schema';
import { BINANCE_BASE_URL, DEFAULT_TRADE_FROM_ID } from './trades.consts';
import axios from 'axios';
import { ITradeEntry } from './trades.interface';

@Injectable()
export class TradesService {
    private readonly logger = new Logger(TradesService.name);

    constructor(@InjectModel(TradeEntry.name) private tradeEntryModel: Model<TradeEntryDocument>) { }

    async getHistoricalTrades(symbol: string, startTime?: number, endTime?: number): Promise<Record<string, any>[]> {
        const response = await axios.get(`${BINANCE_BASE_URL}aggTrades`, {
            params: { symbol: symbol.toUpperCase(), startTime, endTime }
        });

        console.log(response);

        const { data } = response;

        await this._saveHistoricalTrades(symbol, data);
        return data;
    }

    async _saveHistoricalTrades(symbol: string, trades: Record<string, any>[]) {
        if (!trades.length) return;

        const tradesWithSymbol = trades.map((trade: ITradeEntry) => ({
            symbol,
            id: trade.a,
            price: trade.p,
            firstTradeId: trade.f,
            lastTradeId: trade.l,
            timestamp: trade.T,
            isBuyerMaker: trade.m,
            isBestMatch: trade.M
        }));
        await this.tradeEntryModel.insertMany(tradesWithSymbol);
        this.logger.log(`${trades.length} historical trades were stored in the database`);
    }
}
