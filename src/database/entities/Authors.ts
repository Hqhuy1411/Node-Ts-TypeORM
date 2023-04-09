import { DbTable } from "../../constants/DbTable";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Books";

@Entity(DbTable.AUTHORS)
export class Author{
    @PrimaryGeneratedColumn()
    id : number

    @Column({nullable :false})
    name : string

    @Column({nullable :false,unique : true})
    email : string

    @Column({nullable :true})
    bio : string

    @Column({nullable :true})
    image : string

    @OneToMany((type) => Book, (book) => book.author)
    books: Book[];
}
