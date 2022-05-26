import { Migration } from '@mikro-orm/migrations';

export class Migration20220525221205 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "password_resets" add column "expires_at" timestamptz(0) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "password_resets" drop column "expires_at";');
  }

}
