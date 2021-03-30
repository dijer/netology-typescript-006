import { Injectable } from '@nestjs/common';
import { IUser } from './users.interface';
import { User, IUserData } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { SigninRequestDto } from './dto/signin.dto';

const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<IUser>,
  ) {}

  public async createUser(userData: IUserData): Promise<string> {
    const user = new this.UserModel(userData);
    await user.save();
    return user._id;
  }

  public async getUserByEmail(email: string): Promise<IUser> {
    const user = this.UserModel.findOne({
      email,
    });
    return user;
  }

  public async signin({ email, password }: SigninRequestDto) {
    const user = await this.getUserByEmail(email);
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET,
    );
    return {
      id: user._id,
      token,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.UserModel.findOne({
      email,
    });
    if (user && user.password === password) {
      const { password: undef, ...result } = user;
      return result;
    }
    return null;
  }
}
