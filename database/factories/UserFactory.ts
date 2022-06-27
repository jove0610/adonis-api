import User from 'App/Models/User';
import Factory from '@ioc:Adonis/Lucid/Factory';

export default Factory.define(User, async ({ faker }) => {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    address: faker.name.lastName(),
    post_code: faker.name.lastName(),
    phone_number: faker.name.lastName(),
    email: faker.name.lastName(),
    username: faker.unique(faker.internet.userName),
    password: faker.internet.password(),
    is_admin: faker.datatype.boolean(),
  };
}).build();
