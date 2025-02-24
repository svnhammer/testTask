import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { TradesService } from './trades.service';

@Controller('trades')
export class TradesController {
    constructor(private readonly tradesService: TradesService) { }

    @Get('historical')
    async getHistoricalTrades(@Query('symbol') symbol: string, @Query('fromId') fromId?: number) {
        if (!symbol) {
            throw new BadRequestException('No symbol provided');
        }


    }
}
