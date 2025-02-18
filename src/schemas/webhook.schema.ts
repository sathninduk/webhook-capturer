import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Webhook extends Document {
  @Prop({ required: true })
  merchantId: string;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  timestamp: string;

  @Prop({ required: true })
  signature: string;

  @Prop({ required: true })
  txHash: string;

  @Prop({ required: true })
  comments: string;
}

export const WebhookSchema = SchemaFactory.createForClass(Webhook);