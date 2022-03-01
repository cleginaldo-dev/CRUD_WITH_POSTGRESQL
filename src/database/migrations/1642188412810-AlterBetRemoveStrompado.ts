import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterBetRemoveStrompado1642188412810
  implements MigrationInterface
{
  name = "AlterBetRemoveStrompado1642188412810";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bet" DROP COLUMN "strompado"`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "balance" DROP DEFAULT`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "balance" SET DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "bet" ADD "strompado" character varying NOT NULL`
    );
  }
}
