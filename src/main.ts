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
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as csrf from 'csurf';
import { renderFile } from 'ejs';
import * as bodyParser from 'body-parser';

const server: Express = express();

async function bootstrap(expressInstance: Express) {
  const app = await NestFactory.create<NestExpressApplication>(
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
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(csrf({ cookie: true }));

  app.engine('html', renderFile);
  app.setBaseViewsDir(path.resolve('./src/views'));

  await app.listen(3000);
}
bootstrap(server);
exports.widgets = functions.https.onRequest(server);
