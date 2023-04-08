import { Request, Response } from 'express';
import { Author } from "../../database/entities/Authors"
import { AppDataSource } from "../../database/data-source"
import { Users } from "../../database/entities/Users"
import { ResponseUtil } from '../../utils/Response';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { CreateAuthDto } from '../dtos/CreateAuthDTO';
import { validate } from 'class-validator';


export class UserController {

    async create(req: Request, res: Response) {
        let errors :any;
        const { username, passsword,name , email } = req.body


        const dtoUser = new CreateUserDto()
        const dtoAuth = new CreateAuthDto()
        Object.assign(dtoAuth, {email,name})
        Object.assign(dtoUser,{username,passsword,dtoAuth});
        if ((errors= await validate(dtoUser)).length >0 || (errors =await validate(dtoAuth)).length >0) {
            return ResponseUtil.sendErrror(res, "Invalid data", 422, errors)
        }

        
        const repoUser = AppDataSource.getRepository(Users)
        const repoAuthor = AppDataSource.getRepository(Author)
        const author = repoAuthor.create(req.body)
        const saveAuthor = await repoAuthor.save(author)
        const user = repoUser.create({...req.body, author :saveAuthor } );
        await repoUser.save(user);
      
        return ResponseUtil.sendResponse(res, "Save success", user)
    }
}