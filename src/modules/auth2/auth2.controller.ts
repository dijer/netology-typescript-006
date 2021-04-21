import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Auth2Service } from './auth2.service';
import { Auth2Dto } from './auth2User.dto';
import { LoginDto } from './login.dto';
import * as admin from 'firebase-admin';

@Controller()
export class Auth2Controller {
  constructor(private auth2Service: Auth2Service) {}

  @Get()
  root(@Res() res) {
    res.render('index.html', { title: 'Главная' });
  }

  @Get('/user/login')
  login(@Res() res) {
    res.render('login.html', { title: 'Авторизация' });
  }

  @Get('/user/signup')
  signup(@Req() req, @Res() res) {
    res.render('signup.html', {
      title: 'Регистрация',
      csrfToken: req.csrfToken(),
    });
  }

  @Get('/user/profile')
  async profile(@Req() req, @Res() res) {
    const sessionCookie = req.cookies.session || '';
    try {
      const userRecord = await admin.auth().verifySessionCookie(sessionCookie);
      res.render('profile.html', {
        title: 'Профиль',
        userRecord: userRecord,
      });
    } catch (e) {
      console.log(e);
      res.redirect('/user/login');
    }
  }

  @Post('/user/signup')
  async create(@Res() res, @Body() CreateUserDto: Auth2Dto) {
    try {
      await this.auth2Service.createUser(CreateUserDto);
      res.redirect('/user/login');
    } catch (e) {
      console.log(e);
      res.redirect('/user/signup');
    }
  }

  @Post('/user/sessionLogin')
  async sessionLogin(@Res() res, @Body() body) {
    const idToken = body.idToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    try {
      const sessionCookie = await admin
        .auth()
        .createSessionCookie(idToken, { expiresIn });
      res.cookie('session', sessionCookie);
      res.json({ status: 'success' });
    } catch (e) {
      res.status(401).redirect('/user/login');
    }
  }

  @Get('/user/sessionLogout')
  async sessionLogout(@Res() res) {
    res.clearCookie('session');
    res.redirect('/user/login');
  }
}
