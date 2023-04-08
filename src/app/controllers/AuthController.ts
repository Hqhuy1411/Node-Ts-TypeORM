import { Response, Request } from "express";
import { LoginDTO } from "../dtos/LoginDto";
import { AppDataSource } from "../../database/data-source";
import { Author } from "../../database/entities/Authors";
import { ResponseUtil } from "../../utils/Response";
import { Users } from "../../database/entities/Users";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { validate } from "class-validator";
export class AuthController {

    async login(req: Request, res: Response) {
        let errors:any
        const { email, passsword } = req.body

        const dto = new LoginDTO()
        dto.email = email
        dto.passsword = passsword
        if ((errors= await validate(dto)).length >0 ) {
            return ResponseUtil.sendErrror(res, "Invalid data", 422, errors)
        }
        const repoAuthor = AppDataSource.getRepository(Author)
        const author = await repoAuthor.findOneBy({ email })

        if (!author) {
            return ResponseUtil.sendErrror(res, "Invalid credendical", 401, null)
        }
        const repoUser = AppDataSource.getRepository(Users)
        const user = await repoUser.findOneBy({ author })

        if (user) {
            const validPassword = await compare(req.body.passsword, user.passsword)
            if (validPassword == false) {
                return res.status(400).json("wrong password")
            }
            const accessToken = sign({ userId: user.id }, 'my_secret_key', { expiresIn: '1h' });
            return ResponseUtil.sendResponse(res, "User login success", { user, accessToken });
        }else {
            return ResponseUtil.sendErrror(res, "Invalid credendical", 401, null)

        }

    }
}