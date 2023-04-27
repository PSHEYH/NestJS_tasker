import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8, 24)
    password: string;

    @IsOptional()
    @Length(0, 250)
    fcm_token?: string;
}