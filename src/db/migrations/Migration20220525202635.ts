import { Migration } from '@mikro-orm/migrations';

export class Migration20220525202635 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "password_resets" add column "updated_at" timestamptz(0) not null;');
    this.addSql('alter table "password_resets" alter column "id" type int using ("id"::int);');
    this.addSql('create sequence if not exists "password_resets_id_seq";');
    this.addSql('select setval(\'password_resets_id_seq\', (select max("id") from "password_resets"));');
    this.addSql('alter table "password_resets" alter column "id" set default nextval(\'password_resets_id_seq\');');
  }

  async down(): Promise<void> {
    this.addSql('alter table "password_resets" alter column "id" type varchar(255) using ("id"::varchar(255));');
    this.addSql('alter table "password_resets" drop column "updated_at";');
    this.addSql('alter table "password_resets" alter column "id" drop default;');
  }

}
