import { Table, Column, AllowNull, AutoIncrement, CreatedAt, DataType, Default, DeletedAt, PrimaryKey, Model, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Chat from './Chat';
import User from './User';

@Table({
  tableName: 'chat_participants',
  updatedAt: false,
})
class ChatParticipant extends Model {
  @BelongsTo(() => Chat)
  chat: Chat

  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @ForeignKey(() => Chat)
  @AllowNull(false)
  @Column({
    field: 'chat_id',
  })
  chatId: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    field: 'user_id',
  })
  userId: number;

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

export default ChatParticipant;
