import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Role } from 'src/roles/roles.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        RolesModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_KEY || 'secret',
            signOptions: { expiresIn: '24h' }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [TypeOrmModule]
})
export class AuthModule { }
