import { IsNotEmpty, Length } from "class-validator";


export class CreateCategoryDto{
    @Length(0, 30)
    @IsNotEmpty()
    name: string;

    @Length(0, 100)
    @IsNotEmpty()
    url: string;
}