import { Migration } from '@mikro-orm/migrations';

export class Migration20220525202416 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "password_resets" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "email" varchar(255) not null, "token" varchar(255) not null);');
    this.addSql('alter table "password_resets" add constraint "password_resets_pkey" primary key ("id");');

    this.addSql('drop table if exists "password_reset" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "password_reset" ("id" varchar not null default null, "created_at" timestamptz not null default null, "email" varchar not null default null, "token" varchar not null default null);');
    this.addSql('alter table "password_reset" add constraint "password_reset_pkey" primary key ("id");');

    this.addSql('drop table if exists "password_resets" cascade;');
  }

}
