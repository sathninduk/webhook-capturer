import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebhookDto } from './dto/webhook.dto';
import { Webhook } from './schemas/webhook.schema';

@Injectable()
export class AppService {
  private readonly MERCHANT_SECRET = 'SAMPLE_SECRET';

  constructor(@InjectModel(Webhook.name) private webhookModel: Model<Webhook>) {}

  getHello(): string {
    return 'Webhook Tester';
  }

  async webhook(webhookDto: WebhookDto): Promise<any> {
    const { merchantId, orderId, status, timestamp, txHash, signature, comments } = webhookDto;

    // Reconstruct data string
    const data = `${merchantId}${orderId}${status}${timestamp}${comments}`.toUpperCase();
    const computedTxHash = crypto.createHash('md5').update(data).digest('hex');

    // Verify txHash
    if (computedTxHash !== txHash) {
      throw new Error('Invalid txHash');
    }

    // Validate signature
    const computedSignature = crypto.createHmac('sha256', this.MERCHANT_SECRET)
      .update(txHash)
      .digest('hex');

    if (computedSignature !== signature) {
      throw new Error('Invalid signature');
    }

    // Save the webhook data to the database
    const createdWebhook = new this.webhookModel(webhookDto);
    await createdWebhook.save();
    console.log('Webhook received successfully:', webhookDto);
    return { message: 'Webhook signature verified successfully' };
  }
}