import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, { dbName: 'testTaskDb' })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
