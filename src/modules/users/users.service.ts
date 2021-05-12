import { Injectable } from '@nestjs/common';
import { IUser } from './users.interface';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupRequestDto } from './signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<IUser>,
  ) {}

  public async createUser(data: SignupRequestDto): Promise<Partial<IUser>> {
    const user = new this.UserModel(data);
    await user.save();
    const userCopy = user.toObject();
    delete userCopy.password;
    return userCopy;
  }

  public async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.UserModel.findOne({
      email,
    });
    return user;
  }
}
