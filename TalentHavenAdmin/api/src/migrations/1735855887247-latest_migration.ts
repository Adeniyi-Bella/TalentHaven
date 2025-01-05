import { MigrationInterface, QueryRunner } from "typeorm";

export class LatestMigration1735855887247 implements MigrationInterface {
    name = "LatestMigration1735855887247"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"job_offer\" RENAME COLUMN \"job_position\" TO \"position\"");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"job_offer\" RENAME COLUMN \"position\" TO \"job_position\"");
    }

}
