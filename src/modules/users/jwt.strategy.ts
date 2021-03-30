import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './users.service';
import { PassportStrategy } from '@nestjs/passport';

const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }

  public async validate(payload: any) {
    const user = await this.usersService.validateUser(
      payload.name,
      payload.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
