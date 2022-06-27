import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const username = request.input('username');
    const password = request.input('password');

    // Lookup user manually
    const user = await User.query().where('username', username).first();
    if (!user) {
      return response.unauthorized('Invalid credentials');
    }

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials');
    }

    // Generate token
    const token = await auth.use('api').generate(user, {
      expiresIn: '1hour',
      name: username,
    });
    return token;
  }

  public async user({ auth }: HttpContextContract) {
    return auth.user;
  }
}
