import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SigninRequestDto } from './dto/signin.dto';
import { SignupRequestDto } from './dto/signup.dto';
import { PasswordHashPipe } from '../../common/pipes/passwordHash.pipe';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signin')
  @UsePipes(PasswordHashPipe)
  @UseGuards(JwtAuthGuard)
  public signin(@Body() body: SigninRequestDto) {
    const user = this.usersService.signin(body);
    return user;
  }

  @Post('/signup')
  @UsePipes(PasswordHashPipe)
  public async signup(@Body() body: SignupRequestDto): Promise<string> {
    const userId = await this.usersService.createUser(body);
    return userId;
  }
}
