import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Unique } from "typeorm";
import { CreateAuthDto } from "./CreateAuthDTO";

export class CreateUserDto {

    id?: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string

    @IsNotEmpty()
    @IsString()
    passsword: string

    @IsOptional()
    dtoAuth: CreateAuthDto;


}