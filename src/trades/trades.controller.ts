import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { TradesService } from './trades.service';

@Controller('trades')
export class TradesController {
    constructor(private readonly tradesService: TradesService) { }

    @Get('historical')
    async getHistoricalTrades(@Query('symbol') symbol: string, @Query('startTime') startTime: number, @Query('endTime') endTime: number) {
        if (!symbol) {
            throw new BadRequestException('No symbol provided');
        }

        return await this.tradesService.getHistoricalTrades(symbol, startTime, endTime);
    }

    @Get('analyze')
    async analyzeHistoricalTrades(@Query('symbol') symbol: string, @Query('startTime') startTime: number, @Query('endTime') endTime: number) {
        if (!symbol || !startTime || !endTime) {
            throw new BadRequestException('Invalid input');
        }

        return await this.tradesService.analyzePriceChanges(symbol, startTime, endTime);
    }
}
