import { AppDataSource } from "../../database/data-source";
import { Author } from "../../database/entities/authors";
import { Request, Response } from 'express';

export class AuthorController {
    async test(req: Request, res: Response) {
        const authors = await AppDataSource.getRepository(Author).find();

        return res.status(200).json({
            success: true,
            message: "Success",
            data: authors
        });

    }
}
