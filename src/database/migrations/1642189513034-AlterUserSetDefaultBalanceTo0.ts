import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserSetDefaultBalanceTo01642189513034
  implements MigrationInterface
{
  name = "AlterUserSetDefaultBalanceTo01642189513034";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "balance" smallint NOT NULL DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "balance" integer NOT NULL`
    );
  }
}
