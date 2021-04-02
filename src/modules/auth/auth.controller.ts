import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SigninRequestDto } from '../auth/signin.dto';
import { EmailValidationPipe } from '../../common/pipes/email-validator.pipe';
import { AuthService } from './auth.service';

@Controller('/api/users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @UsePipes(EmailValidationPipe)
  public signin(@Body() body: SigninRequestDto) {
    return this.authService.signin(body);
  }

  @Post('/passport/signin')
  @UseGuards(JwtAuthGuard)
  public passoportSignin(@Request() req) {
    return req.user;
  }
}
