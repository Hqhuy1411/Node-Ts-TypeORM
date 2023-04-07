import { DbTable } from "../../constants/DbTable";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
