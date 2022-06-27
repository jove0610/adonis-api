import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UserController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all();
    response.json(users);
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const user = await User.create(request.body());
      response.json(user);
    } catch (err) {
      response.abort({ message: err.sqlMessage });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.find(params.id);
    response.json(user || {});
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const user = await User.find(params.id);
      const newUser = await user?.merge(request.body()).save();
      response.json(newUser || {});
    } catch (err) {
      response.abort({ message: err.sqlMessage });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.find(params.id);
      await user?.delete();
      response.json({ message: 'User deleted successfully.' });
    } catch (err) {
      response.abort({ message: err.sqlMessage });
    }
  }

  public async batchDestroy({ request, response }: HttpContextContract) {
    const { id } = request.qs();
    let deletedUser = 0;

    if (!id) {
      return response.json({ message: `Deleted ${deletedUser} users.` });
    }

    const ids = id.split(',');
    for (let i = 0; i < ids.length; i++) {
      try {
        const user = await User.find(ids[i]);
        await user?.delete();

        if (user !== null) {
          deletedUser += 1;
        }
      } catch (err) {
        return response.abort({ message: err.sqlMessage });
      }
    }

    response.json({ message: `Deleted ${deletedUser} users.` });
  }
}
