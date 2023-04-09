import { ResponseUtil } from "../../utils/Response";
import { AppDataSource } from "../../database/data-source";
import { Request, Response } from 'express';
import { Paginator } from "../../database/Pagination";
import { CreateAuthDto, UpdateAuthDto } from "../dtos/CreateAuthDTO";
import { validate } from "class-validator"
import { Book } from "../../database/entities/Books";
import { Users } from "../../database/entities/Users";
import { Author } from "../../database/entities/Authors";


export class BookController {

    async getAll(req: Request, res: Response): Promise<Response> {
        const builder = AppDataSource.getRepository(Book).createQueryBuilder('books').leftJoinAndSelect('books.author', 'authors');
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

    async create(req: any, res: Response) {
        const { idUser } = req.user
        const data = req.body

        const repoUser = AppDataSource.manager.getRepository(Users)
        const repoAuthor = AppDataSource.getRepository(Author)
        const repoBook = AppDataSource.getRepository(Book)

        const user = await repoUser.findOne({
            where : {
                id : idUser
            },
            relations : ['author']
        })
        const author = await repoAuthor.findOneByOrFail({id : user!.author.id})
        
        const book = repoBook.create({...data,author})
        const bookSave = await repoBook.save(book)

        return ResponseUtil.sendResponse(res, "Save success", bookSave)
    }

    async update(req: any, res: Response) {
        const {idBook} = req.params
        const data = req.body
        const { idUser } = req.user


        const repoUser = AppDataSource.manager.getRepository(Users)
        const repoAuthor = AppDataSource.getRepository(Author)
        const repoBook = AppDataSource.getRepository(Book)

        const user = await repoUser.findOne({
            where : {
                id : idUser
            },
            relations : ['author']
        })
        const author = await repoAuthor.findOneByOrFail({id : user!.author.id})
        const book = await repoBook.findOneByOrFail({id : idBook})

        if(book.author.id == author.id){
            repoBook.merge(book,data)
            await repoBook.save(book)
            return ResponseUtil.sendResponse(res, "Update success", book)
        }else{
            return ResponseUtil.sendResponse(res, "You are not author of book", null)
        }
    }

    async delete(req: any, res: Response) {
        const {idBook} = req.params
        const { idUser } = req.user

        const repoUser = AppDataSource.manager.getRepository(Users)
        const repoAuthor = AppDataSource.getRepository(Author)
        const repoBook = AppDataSource.getRepository(Book)

        const user = await repoUser.findOne({
            where : {
                id : idUser
            },
            relations : ['author']
        })
        const author = await repoAuthor.findOneByOrFail({id : user!.author.id})
        const book = await repoBook.findOneByOrFail({id: idBook})
        
        if(book.author.id === author.id){
            await repoBook.delete(book.id);
            return ResponseUtil.sendResponse(res, "Delete success", null)
    
        }else{
            return ResponseUtil.sendResponse(res, "You are not author of book", null)
        }
    }
}
