import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { SignupRequestDto } from './signup.dto';
import { PasswordHashPipe } from '../../common/pipes/passwordHash.pipe';
import { UsersService } from './users.service';
import { EmailValidationPipe } from '../../common/pipes/email-validator.pipe';
import { IUser } from './users.interface';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  @UsePipes(EmailValidationPipe)
  @UsePipes(PasswordHashPipe)
  public async signup(@Body() body: SignupRequestDto): Promise<Partial<IUser>> {
    const user = await this.usersService.createUser(body);
    return user;
  }
}
