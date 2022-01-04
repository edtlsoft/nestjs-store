import {MigrationInterface, QueryRunner} from "typeorm";

export class addIndexInProductTable1641267970560 implements MigrationInterface {
    name = 'addIndexInProductTable1641267970560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_0decfc62b4e4834e2024a9d9c4" ON "product" ("price", "stock") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0decfc62b4e4834e2024a9d9c4"`);
    }

}
