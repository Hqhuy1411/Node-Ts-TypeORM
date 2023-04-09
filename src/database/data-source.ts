import {DataSource} from 'typeorm'
import { Author } from "./entities/Authors";
import { Users } from './entities/Users';
import { Book } from './entities/Books';


export const AppDataSource = new DataSource({
    type : "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: '123456789',
    database: "test",
    synchronize: true,
    logging: true,
    entities : [Author,Users,Book],
    subscribers : [],
    migrations: ["src/database/migrations/*.ts"],
    

})