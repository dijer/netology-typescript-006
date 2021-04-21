import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { IAuth2 } from './auth2.interface';
import { Auth2Dto } from './auth2User.dto';
import { LoginDto } from './login.dto';

@Injectable()
export class Auth2Service {
  public async createUser({
    email,
    password,
    displayName,
  }: Auth2Dto): Promise<IAuth2> {
    const user: IAuth2 = await admin.auth().createUser({
      email,
      password,
      displayName,
    });
    return user;
  }

  public async getUser({ idToken }: LoginDto): Promise<any> {
    const token = idToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const user = await admin.auth().createSessionCookie(token, { expiresIn });
    return user;
  }
}
