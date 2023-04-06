import { ResponseUtil } from "../../utils/Response";
import { AppDataSource } from "../../database/data-source";
import { Author } from "../../database/entities/Authors";
import { Request, Response } from 'express';
import { Paginator } from "../../database/Pagination";

export class AuthorController {
    async test(req: Request, res: Response) {
        // const authors = await AppDataSource.getRepository(Author).find();

        // 
        const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id", "DESC");
        const {records:authors  , pagination } = await Paginator.paginate(builder,req)

        return ResponseUtil.sendResponse<Author[]>(res,"Success",authors,pagination)

    }
    async test2(req: Request, res: Response) {
        const {id} = req.params
        // throw new Error("some thing eleqweqwese")

        const author = await AppDataSource.getRepository(Author).findOneByOrFail(
            {id : Number(id)}
        );

        return ResponseUtil.sendResponse<Author>(res,"Success",author)

    }
}
