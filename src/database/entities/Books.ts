import { DbTable } from "../../constants/DbTable";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Author } from "./Authors";


@Entity(DbTable.BOOKS)
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    tittle: string

    @Column({ nullable: false })
    description: string

    @ManyToOne(() => Author, (author) => author.books, { eager: true })
    @JoinColumn({ name: "authorId" })
    author: Author

    @Column()
    price: number;

    @Column()
    category: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}