import { Migration } from '@mikro-orm/migrations';

export class Migration20220528050125 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "role" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);');

    this.addSql('create table "country" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "code" varchar(255) not null, "phone_code" int not null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "address" varchar(255) null, "country_id" int null, "deleted_at" timestamptz(0) null);');

    this.addSql('create table "role_users" ("role_id" int not null, "user_id" int not null);');
    this.addSql('alter table "role_users" add constraint "role_users_pkey" primary key ("role_id", "user_id");');

    this.addSql('create table "password_resets" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "token" varchar(255) not null, "expires_at" timestamptz(0) not null);');

    this.addSql('alter table "user" add constraint "user_country_id_foreign" foreign key ("country_id") references "country" ("id") on update cascade on delete set null;');

    this.addSql('alter table "role_users" add constraint "role_users_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "role_users" add constraint "role_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

}
