import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { TradesModule } from './trades/trades.module';
import { RepositoryModule } from './repository/repository.module';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, { dbName: 'testTaskDb' }),
    TradesModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
