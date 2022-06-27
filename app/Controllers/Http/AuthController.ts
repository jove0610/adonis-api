import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';
import Database from '@ioc:Adonis/Lucid/Database';

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

    // Remove all user's token
    await Database.rawQuery('delete from api_tokens where name = ?', [username]);

    // Generate token
    const token = await auth.use('api').generate(user, {
      expiresIn: '1day',
      name: username,
    });

    response.json({
      user,
      token: token.token,
    });
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke();
    response.json({ message: 'logout successful' });
  }

  public async user({ auth, response }: HttpContextContract) {
    response.json(auth.user);
  }
}
