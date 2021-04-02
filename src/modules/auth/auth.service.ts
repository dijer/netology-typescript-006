import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SigninRequestDto } from './signin.dto';

const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (user && user.password === pass) {
      const userCopy = user.toObject();
      delete userCopy.password;
      return userCopy;
    }
    return null;
  }

  public async signin({ email, password }: SigninRequestDto) {
    const user = await this.usersService.getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
        },
        JWT_SECRET,
      );
      return {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        token,
      };
    }
    throw new UnauthorizedException();
  }
}
