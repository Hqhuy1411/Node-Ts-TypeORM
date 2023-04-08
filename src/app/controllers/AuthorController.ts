import { ResponseUtil } from "../../utils/Response";
import { AppDataSource } from "../../database/data-source";
import { Author } from "../../database/entities/Authors";
import { Request, Response } from 'express';
import { Paginator } from "../../database/Pagination";
import { CreateAuthDto, UpdateAuthDto } from "../dtos/CreateAuthDTO";
import { validate } from "class-validator"


export class AuthorController {

    async getAll(req: Request, res: Response) {
        // const authors = await AppDataSource.getRepository(Author).find();

        // 
        const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id", "DESC");
        const { records: authors, pagination } = await Paginator.paginate(builder, req)

        return ResponseUtil.sendResponse<Author[]>(res, "Success", authors, pagination)

    }
    async get(req: Request, res: Response) {
        const { id } = req.params
        // throw new Error("some thing eleqweqwese")

        const author = await AppDataSource.getRepository(Author).findOneByOrFail(
            { id: Number(id) }
        );

        return ResponseUtil.sendResponse<Author>(res, "Success", author)

    }

    async create(req: Request, res: Response): Promise<Response> {
        const authorData = req.body

        const dto = new CreateAuthDto()
        Object.assign(dto, authorData)
        const errors = await validate(dto)
        if (errors.length > 0) {
            return ResponseUtil.sendErrror(res, "Invalid data", 422, errors)
        }


        const repo = AppDataSource.getRepository(Author)
        const author = repo.create(authorData)
        await repo.save(author)

        return ResponseUtil.sendResponse(res, "Save success", author)
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const authorData = req.body

        const dto = new UpdateAuthDto()
        Object.assign(dto, authorData)
        dto.id = Number(id)
        const errors = await validate(dto)
        if (errors.length > 0) {
            return ResponseUtil.sendErrror(res, "Invalid data", 422, errors)
        }


        const repo = AppDataSource.getRepository(Author)
        // Cách 1
        // const author =await  repo.findOneByOrFail({
        //     id : Number(id)
        // })
        // repo.merge(author,authorData)
        // await repo.save(author)

        // Cách 2
        await repo.update({
            id: Number(id)
        }, authorData)
        const updatedAuthor = await repo.findOneByOrFail({
            id: Number(id)
        })

        return ResponseUtil.sendResponse(res, "Update success", updatedAuthor)
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const repo = AppDataSource.getRepository(Author);
        // Cách 1
        // const author = await repo.findOneByOrFail({
        //   id: Number(id),
        // });
        // await repo.remove(author);
        // Cách 2
        await repo.delete(id);
        return ResponseUtil.sendResponse(res, "Delete success", null)
    }
}
