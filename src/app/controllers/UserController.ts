import { Request, Response } from 'express';
import { Author } from "../../database/entities/Authors"
import { AppDataSource } from "../../database/data-source"
import { Users } from "../../database/entities/Users"
import { ResponseUtil } from '../../utils/Response';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { CreateAuthDto } from '../dtos/CreateAuthDTO';
import { validate } from 'class-validator';
import bcrypt  from 'bcrypt'

export class UserController {

    async create(req: Request, res: Response) {
        let errors :any;
        const { username, passsword,name , email } = req.body
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.passsword, salt);


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
        const user = repoUser.create({...req.body, author :saveAuthor, passsword : hashedPassword } );
        
        await repoUser.save(user);
      
        return ResponseUtil.sendResponse(res, "Save success", user)
    }

    async update(req: any, res: Response) {
        const {id} = req.user
        const data = req.body
        const repoAuthor = AppDataSource.getRepository(Author)
        const repoUser = AppDataSource.manager.getRepository(Users)

        const user = await repoUser.findOne({
            where: {
                id,
            },
            relations: ['author'],
        })
        const author = await repoAuthor.findOneByOrFail({id : user!.author.id})
        
        repoAuthor.merge(author, data)
        await repoAuthor.save(author)

        repoUser.merge(user!, data)
        if(req.body.passsword !=null){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.passsword, salt);
            user!.passsword = hashedPassword

        }
        await repoUser.save(user!)
       return ResponseUtil.sendResponse(res, "Update success", user)
    }

    async delete(req: any, res: Response) {
        const {id} = req.user
        const repoUser = AppDataSource.manager.getRepository(Users)
        await repoUser.delete(id)
     
       return ResponseUtil.sendResponse(res, "Delete success", null)
    }


    
}