import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('first_name', 50).notNullable();
      table.string('last_name', 50).notNullable();
      table.string('address', 100).notNullable();
      table.string('post_code', 10).notNullable();
      table.string('phone_number', 30).notNullable();
      table.string('email', 100).notNullable();
      table.string('username', 50).notNullable().unique();
      table.string('password').notNullable();
      table.boolean('is_admin').defaultTo(false);
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
