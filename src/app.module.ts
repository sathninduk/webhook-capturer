// src/app.module.ts
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {Webhook, WebhookSchema} from './schemas/webhook.schema';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://sathnindu:3j3z5XAPN7uRdJrx@qpl.sg2zl.mongodb.net/?retryWrites=true&w=majority&appName=QPL'),
        MongooseModule.forFeature([{name: Webhook.name, schema: WebhookSchema}])
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}