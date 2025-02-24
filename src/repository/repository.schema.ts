import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TradeEntryDocument = TradeEntry & Document;

@Schema({ timestamps: true })
export class TradeEntry {
  @Prop()
  symbol: string;

  @Prop()
  id: number;

  @Prop()
  price: string;

  @Prop()
  qty: number;

  @Prop()
  firstTradeId: number;

  @Prop()
  lastTradeId: number;

  @Prop()
  timestamp: number;

  @Prop()
  isBuyerMaker: boolean;

  @Prop()
  isBestMatch: boolean;
}

export const RepositorySchema = SchemaFactory.createForClass(TradeEntry);
