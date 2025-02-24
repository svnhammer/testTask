import { Module } from '@nestjs/common';
import { TradesController } from './trades.controller';
import { TradesService } from './trades.service';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  controllers: [TradesController],
  providers: [TradesService],
  imports: [RepositoryModule]
})
export class TradesModule { }
