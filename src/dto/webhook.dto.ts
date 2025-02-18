// src/webhook.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

export class WebhookDto {
  @IsString()
  @IsNotEmpty()
  merchantId: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsString()
  @IsNotEmpty()
  signature: string;

  @IsString()
  @IsNotEmpty()
  txHash: string;

  // nullable
  @IsString()
  @Optional()
  comments: string;

}