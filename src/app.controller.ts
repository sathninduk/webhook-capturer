// src/app.controller.ts
import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { WebhookDto } from './dto/webhook.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('webhook')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getWebhook(@Body() webhookDto: WebhookDto): Promise<void> {
    await this.appService.webhook(webhookDto);
  }
}