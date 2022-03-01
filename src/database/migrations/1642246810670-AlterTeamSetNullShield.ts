import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTeamSetNullShield1642246810670 implements MigrationInterface {
  name = "AlterTeamSetNullShield1642246810670";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teams" ALTER COLUMN "shield" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teams" ALTER COLUMN "shield" SET NOT NULL`
    );
  }
}
