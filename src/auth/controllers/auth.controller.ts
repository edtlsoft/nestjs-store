import { User } from './../../users/entities/user.entity';
import { AuthService } from './../services/auth.service';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
