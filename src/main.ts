import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname + './../../.env') });
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http.exception-filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const server: Express = express();

async function bootstrap(expressInstance: Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  app.enableCors();

  await app.listen(3000);
}
bootstrap(server);
exports.widgets = functions.https.onRequest(server);
