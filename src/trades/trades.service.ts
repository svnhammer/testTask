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

    async getHistoricalTrades(symbol: string, fromId = DEFAULT_TRADE_FROM_ID): Promise<Record<string, any>[]> {
        const response = await axios.get(`${BINANCE_BASE_URL}historicalTrades`, {
            params: { symbol: symbol.toUpperCase(), fromId }
        });

        console.log(response);

        const { data } = response;

        await this._saveHistoricalTrades(symbol, data);
        return data;
    }

    async _saveHistoricalTrades(symbol: string, trades: Record<string, any>[]) {
        this.logger.log('saving');
        if (!trades.length) return;

        const tradesWithSymbol = trades.map((trade: ITradeEntry) => ({
            symbol,
            ...trade
        }));
        this.logger.log('trades retrieved');
        await this.tradeEntryModel.insertMany(tradesWithSymbol);
        this.logger.log(`${trades.length} historical trades were stored in the database`);
    }
}
