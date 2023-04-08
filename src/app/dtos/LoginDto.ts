import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    passsword: string;
  }