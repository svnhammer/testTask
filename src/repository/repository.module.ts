import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositorySchema, TradeEntry } from './repository.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TradeEntry.name, schema: RepositorySchema },
    ]),
  ],
  providers: [RepositoryService],
  exports: [RepositoryModule, MongooseModule]
})
export class RepositoryModule { }
