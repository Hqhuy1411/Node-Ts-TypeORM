import { ResponseUtil } from "../../utils/Response";
import { AppDataSource } from "../../database/data-source";
import { Request, Response } from 'express';
import { Paginator } from "../../database/Pagination";
import { CreateAuthDto, UpdateAuthDto } from "../dtos/CreateAuthDTO";
import { validate } from "class-validator"
import { Book } from "../../database/entities/Books";


export class BookController {

    async getAll(req: Request, res: Response):Promise<Response> {
        const builder =  AppDataSource.getRepository(Book).createQueryBuilder('books').leftJoinAndSelect('books.author', 'authors');
        const { records: books, pagination } = await Paginator.paginate(builder, req)

        return ResponseUtil.sendResponse<Book[]>(res, "Success", books, pagination)
    }
    async get(req: Request, res: Response) {
        const { id } = req.params
        // throw new Error("some thing eleqweqwese")

        const book = await AppDataSource.getRepository(Book).findOneByOrFail(
            { id: Number(id) }
        );

        return ResponseUtil.sendResponse<Book>(res, "Success", book)


    }

    async create(req: Request, res: Response)  {
         
    }

    async update(req: Request, res: Response)  {
   
    }

    async delete(req: Request, res: Response) {

    }
}
