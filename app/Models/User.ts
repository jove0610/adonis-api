import { DateTime } from 'luxon';
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public first_name: string;

  @column()
  public last_name: string;

  @column()
  public address: string;

  @column()
  public post_code: string;

  @column()
  public phone_number: string;

  @column()
  public email: string;

  @column()
  public username: string;

  @column({ serializeAs: null })
  public password: string;

  @column({ serialize: Boolean })
  public is_admin: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
