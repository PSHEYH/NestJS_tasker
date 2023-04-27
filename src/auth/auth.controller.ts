import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginAppleDto } from './dto/login-apple.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
import { LoginDto } from './dto/login.dto';
import { RolesGuard } from './roles.guard';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.signUp(dto);
    }

    @Public()
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('loginGoogle')
    loginGoogle(@Body() dto: LoginGoogleDto) {
        return this.authService.loginGoogle(dto);
    }

    @Post('loginApple')
    loginApple(@Body() dto: LoginAppleDto) {

    }


    @Post('logout')
    logout(@Body() body: User) {
    }

    @Roles('user')
    @UseGuards(RolesGuard)
    @Get('profile')
    profile(@Request() request) {
        return request.user;
    }
}
