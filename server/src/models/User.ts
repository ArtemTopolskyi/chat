import { Table, Column, AllowNull, Unique } from 'sequelize-typescript'
import { ModelBase } from './ModelBase'

@Table({
  tableName: 'users',
})
class User extends ModelBase {
  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Unique(true)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;
}

export default User;
