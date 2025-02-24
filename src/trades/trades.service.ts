import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TradeEntry,
  TradeEntryDocument,
} from 'src/repository/repository.schema';
import {
  BINANCE_BASE_URL,
  TREND_FALLING,
  TREND_RISING,
  TREND_STABLE,
} from './trades.consts';
import axios from 'axios';
import { ITradeEntry } from './trades.interface';

@Injectable()
export class TradesService {
  private readonly logger = new Logger(TradesService.name);

  constructor(
    @InjectModel(TradeEntry.name)
    private tradeEntryModel: Model<TradeEntryDocument>,
  ) {}

  async getHistoricalTrades(
    symbol: string,
    startTime?: number,
    endTime?: number,
  ): Promise<Record<string, any>[]> {
    const response = await axios.get(`${BINANCE_BASE_URL}aggTrades`, {
      params: {
        symbol: symbol.toUpperCase(),
        startTime: startTime * 1000,
        endTime: endTime * 1000,
      },
    });

    const { data } = response;

    return await this._saveHistoricalTrades(symbol, data);
  }

  async analyzePriceChanges(
    symbol: string,
    startTime: number,
    endTime: number,
  ) {
    const retrievedTrades = await this.tradeEntryModel
      .find({ symbol, timestamp: { $gte: startTime, $lte: endTime } })
      .sort({ time: 1 })
      .exec();

    if (retrievedTrades.length < 2) {
      throw new InternalServerErrorException(
        'Insufficient trades stored for given time period',
      );
    }

    const mostRecent = retrievedTrades[0];
    const leastRecent = retrievedTrades[retrievedTrades.length - 1];

    const priceChange =
      parseFloat(mostRecent.price) - parseFloat(leastRecent.price);

    const percentChange = (
      (priceChange / parseFloat(leastRecent.price)) *
      100
    ).toFixed(4);
    const trend =
      priceChange > 0
        ? TREND_RISING
        : priceChange < 0
          ? TREND_FALLING
          : TREND_STABLE;

    return {
      symbol,
      trend,
      percentChange,
    };
  }

  async _saveHistoricalTrades(symbol: string, trades: Record<string, any>[]) {
    if (!trades.length) return;

    const tradesWithSymbol = trades.map((trade: ITradeEntry) => ({
      symbol,
      ...this._serializeToHumanReadable(trade),
    }));
    await this.tradeEntryModel.insertMany(tradesWithSymbol);
    this.logger.log(
      `${trades.length} historical trades were stored in the database`,
    );

    return tradesWithSymbol;
  }

  _serializeToHumanReadable(trade: ITradeEntry) {
    return {
      id: trade.a,
      price: trade.p,
      firstTradeId: trade.f,
      lastTradeId: trade.l,
      timestamp: trade.T,
      isBuyerMaker: trade.m,
      isBestMatch: trade.M,
    };
  }
}
