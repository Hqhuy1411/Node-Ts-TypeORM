import {DataSource} from 'typeorm'
import { Author } from './entities/authors'


export const AppDataSource = new DataSource({
    type : "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: '123456789',
    database: "test",
    synchronize: true,
    logging: true,
    entities : [Author],
    subscribers : [],
    migrations: ["src/database/migrations/*.ts"],
    

})