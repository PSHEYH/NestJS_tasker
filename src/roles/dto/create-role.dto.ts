import { IsNotEmpty, Length } from 'class-validator';

export class CreateRoleDto{
    @IsNotEmpty()
    @Length(0, 65)
    value: string;
    
    @IsNotEmpty()
    @Length(0, 100)
    description: string;

}