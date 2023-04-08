import { DbTable } from "@/constants/DbTable";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUserTable1680930202980 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: DbTable.USERS,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "username",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                        isUnique : true
                    },
                    {
                        name: "username",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "authorId",
                        type: "int",
                        isNullable: false,
                    },
                ]
            }),
            true
        );
        const foreignKey =new TableForeignKey({
            columnNames : ["authorId"],
            referencedColumnNames : ["id"],
            referencedTableName : DbTable.AUTHORS
        })
        await queryRunner.createForeignKey(
            DbTable.USERS, foreignKey
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(DbTable.USERS);
    }

}
