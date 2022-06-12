import { Table, Column, AllowNull, AutoIncrement, CreatedAt, DataType, Default, PrimaryKey, DeletedAt, Model, HasMany } from 'sequelize-typescript'
import ChatParticipant from './ChatParticipant';

@Table({
  tableName: 'chats',
  updatedAt: false,
})
class Chat extends Model {
  @HasMany(() => ChatParticipant)
  participants: ChatParticipant[]

  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @CreatedAt
  @Default(DataType.NOW)
  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @AllowNull(true)
  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date;
}

export default Chat;
