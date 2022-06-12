import { Table, Column, AllowNull, DeletedAt } from 'sequelize-typescript'
import { ModelBase } from './ModelBase'

@Table({
  tableName: 'user_contacts',
})
class UserContact extends ModelBase {
  @AllowNull(false)
  @Column({
    field: 'owner_id',
  })
  ownerId: number;

  @AllowNull(false)
  @Column({
    field: 'contact_id',
  })
  contactId: number;

  @AllowNull(true)
  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date;
}

export default UserContact;
