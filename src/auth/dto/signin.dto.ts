import { IsString, IsNotEmpty } from "class-validator";

export class SignInDTO{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}