import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserBalanceToDecimal1642210642106
  implements MigrationInterface
{
  name = "AlterUserBalanceToDecimal1642210642106";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "balance" numeric NOT NULL DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "balance" smallint NOT NULL DEFAULT '0'`
    );
  }
}
