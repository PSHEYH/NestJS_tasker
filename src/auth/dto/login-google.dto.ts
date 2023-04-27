import { IsNotEmpty, MaxLength } from "class-validator";

export class LoginGoogleDto{

    @IsNotEmpty()
    @MaxLength(1200)
    client_token: string;

    @MaxLength(260)
    fcm_token: string;

    @MaxLength(40)
    name?: string;

    @MaxLength(100)
    avatar?: string;
}