import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Hash from '@ioc:Adonis/Core/Hash';
import User from 'App/Models/User';
import UserFactory from 'Database/factories/UserFactory';

export default class extends BaseSeeder {
  public async run() {
    // create admin account
    await User.firstOrCreate(
      { id: 1 },
      {
        first_name: 'User',
        last_name: 'Admin',
        address: 'Los Angeles',
        post_code: '1770',
        phone_number: '09958459874',
        email: 'admin.user@adonis-api.com',
        username: 'admin',
        password: await Hash.make('123456'),
        is_admin: true,
      }
    );

    // create non-admin account
    await User.firstOrCreate(
      { id: 2 },
      {
        first_name: 'User',
        last_name: 'Not Admin',
        address: 'Boston',
        post_code: '1370',
        phone_number: '09668957458',
        email: 'not.admin.user@adonis-api.com',
        username: 'not-admin',
        password: await Hash.make('123456'),
        is_admin: false,
      }
    );

    await UserFactory.createMany(15);
  }
}
