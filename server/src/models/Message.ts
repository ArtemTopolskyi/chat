import { Table, Column, AllowNull, DeletedAt } from 'sequelize-typescript'
import { ModelBase } from './ModelBase'

@Table({
  tableName: 'messages',
  paranoid: true,
})
class Message extends ModelBase {
  @AllowNull(false)
  @Column({
    field: 'chat_id',
  })
  chatId: number;

  @AllowNull(false)
  @Column({
    field: 'sender_id',
  })
  senderId: number;

  @AllowNull(false)
  @Column({
    field: 'text',
  })
  text: string;

  @AllowNull(true)
  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date;
}

export default Message;
