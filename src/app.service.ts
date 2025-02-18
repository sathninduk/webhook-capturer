// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebhookDto } from './dto/webhook.dto';
import { Webhook } from './schemas/webhook.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Webhook.name) private webhookModel: Model<Webhook>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async webhook(webhookDto: WebhookDto): Promise<void> {
    const createdWebhook = new this.webhookModel(webhookDto);
    await createdWebhook.save();
    console.log('Webhook data saved:', webhookDto);
  }
}