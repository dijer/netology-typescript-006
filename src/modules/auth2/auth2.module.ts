import { Module } from '@nestjs/common';
import { Auth2Controller } from './auth2.controller';
import { Auth2Service } from './auth2.service';

@Module({
  imports: [],
  providers: [Auth2Service],
  controllers: [Auth2Controller],
  exports: [Auth2Service],
})
export class Auth2Module {}
