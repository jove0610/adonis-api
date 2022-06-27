import User from 'App/Models/User';
import Factory from '@ioc:Adonis/Lucid/Factory';
import Hash from '@ioc:Adonis/Core/Hash';

export default Factory.define(User, async ({ faker }) => {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    address: faker.name.lastName(),
    post_code: faker.name.lastName(),
    phone_number: faker.name.lastName(),
    email: faker.name.lastName(),
    username: faker.unique(faker.internet.userName),
    password: await Hash.make('123456'),
    is_admin: faker.datatype.boolean(),
  };
}).build();
