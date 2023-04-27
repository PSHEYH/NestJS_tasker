import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import fetch from 'node-fetch';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs";

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { LoginDto } from './dto/login.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
import crypto from 'crypto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private roleService: RolesService,
        private jwtService: JwtService
    ) { }

    async signUp(dto: CreateUserDto) {
        const existedUser = await this.userRepository.findOne({
            where: {
                email: dto.email
            }
        });
        if (existedUser !== null) {
            throw new HttpException('User exist', 401);
        }

        dto.password = await bcrypt.hash(dto.password, 10);
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('user');
        user.roles = [role];
        await this.userRepository.save(user);

        const payload = {
            email: dto.email,
            sub: user.device_id,
            roles: user.roles
        };

        const access_token = await this.jwtService.signAsync(payload);
        return {
            access_token: access_token,
            expires_in: 43200
        };
    }

    async login(dto: LoginDto) {

        const user = await this.userRepository
            .createQueryBuilder('users')
            .select(['users.email', 'users.device_id', 'users.password', 'roles'])
            .leftJoinAndSelect("users.roles", "roles")
            .where('users.email = :email', { email: dto.email })
            .getOne();

        if (user === null) {
            throw new UnauthorizedException('User not found');
        }

        if (!await bcrypt.compare(dto.password, user.password)) {
            throw new UnauthorizedException('Wrong password');
        }

        if (dto.fcm_token !== undefined) {
            await this.userRepository.update({
                device_id: user.device_id,
            }, {
                fcm_token: dto.fcm_token
            });
        }

        const payload = {
            email: dto.email,
            sub: user.device_id,
            roles: user.roles
        };

        const access_token = await this.jwtService.signAsync(payload);
        return {
            access_token: access_token,
            expires_in: 43200
        };

    }

    async loginGoogle(dto: LoginGoogleDto) {
        const googleResponse = await fetch("https://oauth2.googleapis.com/tokeninfo", {
            method: 'POST',
            body: JSON.stringify({ id_token: dto.client_token }),
            headers: { 'Content-Type': 'application/json' },
        });

        const googleData = await googleResponse.json();

        if (!googleData.hasOwnProperty('email') || !googleData.hasOwnProperty('email_verified')) {
            throw new HttpException('Wrong google data', 401);
        }
        if (googleData.email_verified === false) {
            throw new HttpException('Wrong google data', 401);
        }

        const password = crypto.randomBytes(Math.ceil(64 / 2)).toString('hex').slice(0, 64);
        const refreshKey = crypto.randomBytes(Math.ceil(64 / 2)).toString('hex').slice(0, 64);

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await this.userRepository.create({
            email: googleData.email,
            password: hashPassword,
            fcm_token: dto.fcm_token,
            name: dto.fcm_token,
            avatar: dto.avatar
        });

        const newUser = await this.userRepository.save(user);

        const payload = {
            email: googleData.email,
            sub: newUser.device_id,
            roles: newUser.roles
        };

        const access_token = await this.jwtService.signAsync(payload);

        return {
            access_token: access_token,
            expires_in: 43200
        };
    }
}
