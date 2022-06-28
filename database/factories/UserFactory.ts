import User from 'App/Models/User';
import Factory from '@ioc:Adonis/Lucid/Factory';

export default Factory.define(User, async ({ faker }) => {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    address: faker.address.cityName(),
    post_code: faker.address.zipCode(),
    phone_number: faker.phone.number(),
    email: faker.internet.email(),
    username: faker.unique(faker.internet.userName),
    password: faker.internet.password(),
    is_admin: faker.datatype.boolean(),
  };
}).build();
