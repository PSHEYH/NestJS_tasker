import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @Length(0, 65)
    readonly device_id: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @Length(8, 24)
    password: string;

    @IsOptional()
    @Length(0, 250)
    readonly fcm_token?: string;
}