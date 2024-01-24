const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class Migration1706101124920 {
  constructor() {
    console.log('Migration1706101124920');
  }
  name = 'Migration1706101124920';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "users"`);
  }
};
