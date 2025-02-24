/*
[
    "id": 4584955086,
        "price": "95656.14000000",
        "qty": "0.00006000",
        "quoteQty": "5.73936840",
        "time": 1740405423935,
        "isBuyerMaker": true,
        "isBestMatch": true
]
*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TradeEntryDocument = TradeEntry & Document;

@Schema({ timestamps: true })
export class TradeEntry {
  @Prop()
  symbol: string;

  @Prop()
  price: string;

  @Prop()
  qty: number;

  @Prop()
  quoteQty: number;

  @Prop()
  time: number;

  @Prop()
  isBuyerMaker: boolean;

  @Prop()
  isBestMatch: boolean;
}

export const RepositorySchema = SchemaFactory.createForClass(TradeEntry);
