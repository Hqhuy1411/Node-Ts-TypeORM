import { DbTable } from "../../constants/DbTable";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Authors";


@Entity(DbTable.USERS)
export class Users{
    @PrimaryGeneratedColumn()
    id : number

    @Column({nullable : false,unique:true})
    username :string

    @Column({nullable : false})
    passsword :string

    @OneToOne(()=>Author)
    @JoinColumn({name:'authorId'})
    author: Author

}