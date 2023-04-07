import { IsNotEmpty,IsString , MinLength, MaxLength, IsEmail,IsOptional } from "class-validator"

export class CreateAuthDto{

    id?: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string 

    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsOptional()
    @IsString()
    @MaxLength(200)
    bio: string;
}

export class UpdateAuthDto{

    id?: number;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string 

    @IsEmail()
    email : string

    @IsOptional()
    @IsString()
    @MaxLength(200)
    bio: string;
}