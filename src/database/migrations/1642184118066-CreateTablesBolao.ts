import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesBolao1642184118066 implements MigrationInterface {
  name = "CreateTablesBolao1642184118066";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "round" ("id" uuid NOT NULL, "name" character varying NOT NULL, "championship_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_34bd959f3f4a90eb86e4ae24d2d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "teams" ("id" uuid NOT NULL, "name" character varying NOT NULL, "championship_id" uuid NOT NULL, "shield" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "championship" ("id" uuid NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_56bdaa561586755c210dadc67c5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL, "balance" integer NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "bet" ("id" uuid NOT NULL, "status" character varying NOT NULL, "strompado" character varying NOT NULL, "scoreboard" smallint NOT NULL, "round_id" uuid NOT NULL, "chapionship_id" uuid NOT NULL, "user_id" uuid NOT NULL, "punctuation" smallint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4ceea2cdef435807614b8e17aed" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "videos" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "category_id" uuid NOT NULL, "duration" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "chanpion" ("id" uuid NOT NULL, "name" character varying NOT NULL, "puntuação" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a1a2cfbd84eaa8f99f8cbbe68d2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "sponsor" ("id" uuid NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_31c4354cde945c685aabe017541" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "teams_bets_bet" ("teamsId" uuid NOT NULL, "betId" uuid NOT NULL, CONSTRAINT "PK_617640e0ff122a3cddaed77d486" PRIMARY KEY ("teamsId", "betId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b16fc1b2859b549b92e9969cae" ON "teams_bets_bet" ("teamsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8d00fd4770268ed9ce4bf6f5fd" ON "teams_bets_bet" ("betId") `
    );
    await queryRunner.query(
      `CREATE TABLE "user_championships_championship" ("userId" uuid NOT NULL, "championshipId" uuid NOT NULL, CONSTRAINT "PK_c4fd22b51410e8b46b375040f72" PRIMARY KEY ("userId", "championshipId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_518c3ecc1729d72e3e1b2d622a" ON "user_championships_championship" ("userId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d29fcae57ba1c5f1975f1f054f" ON "user_championships_championship" ("championshipId") `
    );
    await queryRunner.query(
      `CREATE TABLE "chanpion_rounds_round" ("chanpionId" uuid NOT NULL, "roundId" uuid NOT NULL, CONSTRAINT "PK_84edb6389d2721ec5dbf0186ba9" PRIMARY KEY ("chanpionId", "roundId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cdd2f808be6f038f2818c61e75" ON "chanpion_rounds_round" ("chanpionId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0b573fe5b47bd23cb14f6fa779" ON "chanpion_rounds_round" ("roundId") `
    );
    await queryRunner.query(
      `CREATE TABLE "chanpion_users_user" ("chanpionId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_c96275a4e78e24100527738ca66" PRIMARY KEY ("chanpionId", "userId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_30ef2bd52f6de940d34a2c5626" ON "chanpion_users_user" ("chanpionId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4b34ef201ca84e45928f81f4aa" ON "chanpion_users_user" ("userId") `
    );
    await queryRunner.query(
      `ALTER TABLE "round" ADD CONSTRAINT "FK_7ef43f92b036e7452586dbccfc1" FOREIGN KEY ("championship_id") REFERENCES "championship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "teams" ADD CONSTRAINT "FK_38f003cf0389007a3d5e687b58d" FOREIGN KEY ("championship_id") REFERENCES "championship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bet" ADD CONSTRAINT "FK_abaac670290b1ec4f441b73a8ab" FOREIGN KEY ("round_id") REFERENCES "round"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bet" ADD CONSTRAINT "FK_397c6af811b3ca0627346182a60" FOREIGN KEY ("chapionship_id") REFERENCES "championship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bet" ADD CONSTRAINT "FK_6bdc104d1a93c73245755da4684" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "videos" ADD CONSTRAINT "FK_f9fe0463a9fa4899f41ab736511" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "teams_bets_bet" ADD CONSTRAINT "FK_b16fc1b2859b549b92e9969caef" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "teams_bets_bet" ADD CONSTRAINT "FK_8d00fd4770268ed9ce4bf6f5fdf" FOREIGN KEY ("betId") REFERENCES "bet"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_championships_championship" ADD CONSTRAINT "FK_518c3ecc1729d72e3e1b2d622a6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_championships_championship" ADD CONSTRAINT "FK_d29fcae57ba1c5f1975f1f054f2" FOREIGN KEY ("championshipId") REFERENCES "championship"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "chanpion_rounds_round" ADD CONSTRAINT "FK_cdd2f808be6f038f2818c61e757" FOREIGN KEY ("chanpionId") REFERENCES "chanpion"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "chanpion_rounds_round" ADD CONSTRAINT "FK_0b573fe5b47bd23cb14f6fa7793" FOREIGN KEY ("roundId") REFERENCES "round"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "chanpion_users_user" ADD CONSTRAINT "FK_30ef2bd52f6de940d34a2c56267" FOREIGN KEY ("chanpionId") REFERENCES "chanpion"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "chanpion_users_user" ADD CONSTRAINT "FK_4b34ef201ca84e45928f81f4aa8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chanpion_users_user" DROP CONSTRAINT "FK_4b34ef201ca84e45928f81f4aa8"`
    );
    await queryRunner.query(
      `ALTER TABLE "chanpion_users_user" DROP CONSTRAINT "FK_30ef2bd52f6de940d34a2c56267"`
    );
    await queryRunner.query(
      `ALTER TABLE "chanpion_rounds_round" DROP CONSTRAINT "FK_0b573fe5b47bd23cb14f6fa7793"`
    );
    await queryRunner.query(
      `ALTER TABLE "chanpion_rounds_round" DROP CONSTRAINT "FK_cdd2f808be6f038f2818c61e757"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_championships_championship" DROP CONSTRAINT "FK_d29fcae57ba1c5f1975f1f054f2"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_championships_championship" DROP CONSTRAINT "FK_518c3ecc1729d72e3e1b2d622a6"`
    );
    await queryRunner.query(
      `ALTER TABLE "teams_bets_bet" DROP CONSTRAINT "FK_8d00fd4770268ed9ce4bf6f5fdf"`
    );
    await queryRunner.query(
      `ALTER TABLE "teams_bets_bet" DROP CONSTRAINT "FK_b16fc1b2859b549b92e9969caef"`
    );
    await queryRunner.query(
      `ALTER TABLE "videos" DROP CONSTRAINT "FK_f9fe0463a9fa4899f41ab736511"`
    );
    await queryRunner.query(
      `ALTER TABLE "bet" DROP CONSTRAINT "FK_6bdc104d1a93c73245755da4684"`
    );
    await queryRunner.query(
      `ALTER TABLE "bet" DROP CONSTRAINT "FK_397c6af811b3ca0627346182a60"`
    );
    await queryRunner.query(
      `ALTER TABLE "bet" DROP CONSTRAINT "FK_abaac670290b1ec4f441b73a8ab"`
    );
    await queryRunner.query(
      `ALTER TABLE "teams" DROP CONSTRAINT "FK_38f003cf0389007a3d5e687b58d"`
    );
    await queryRunner.query(
      `ALTER TABLE "round" DROP CONSTRAINT "FK_7ef43f92b036e7452586dbccfc1"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4b34ef201ca84e45928f81f4aa"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_30ef2bd52f6de940d34a2c5626"`
    );
    await queryRunner.query(`DROP TABLE "chanpion_users_user"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0b573fe5b47bd23cb14f6fa779"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cdd2f808be6f038f2818c61e75"`
    );
    await queryRunner.query(`DROP TABLE "chanpion_rounds_round"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d29fcae57ba1c5f1975f1f054f"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_518c3ecc1729d72e3e1b2d622a"`
    );
    await queryRunner.query(`DROP TABLE "user_championships_championship"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8d00fd4770268ed9ce4bf6f5fd"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b16fc1b2859b549b92e9969cae"`
    );
    await queryRunner.query(`DROP TABLE "teams_bets_bet"`);
    await queryRunner.query(`DROP TABLE "sponsor"`);
    await queryRunner.query(`DROP TABLE "chanpion"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "videos"`);
    await queryRunner.query(`DROP TABLE "bet"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "championship"`);
    await queryRunner.query(`DROP TABLE "teams"`);
    await queryRunner.query(`DROP TABLE "round"`);
  }
}
