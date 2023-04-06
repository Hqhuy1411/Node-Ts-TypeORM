import { ResponseUtil } from "../../utils/Response";
import { AppDataSource } from "../../database/data-source";
import { Author } from "../../database/entities/Authors";
import { Request, Response } from 'express';

export class AuthorController {
    async test(req: Request, res: Response) {
        const authors = await AppDataSource.getRepository(Author).find();

        return ResponseUtil.sendResponse<Author[]>(res,"Success",authors)

    }
    async test2(req: Request, res: Response) {
        const {id} = req.params
        throw new Error("some thing eleqweqwese")

        const author = await AppDataSource.getRepository(Author).findOneByOrFail(
            {id : Number(id)}
        );

        return ResponseUtil.sendResponse<Author>(res,"Success",author)

    }
}
