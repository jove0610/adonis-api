import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class IsAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (!auth.user?.is_admin) {
      response.unauthorized({ error: 'Unauthorized' });
    }
    await next();
  }
}
