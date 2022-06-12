import {
  AllowNull,
  AutoIncrement, Column, CreatedAt, DataType, Default,
  Model,
  PrimaryKey, UpdatedAt,
} from 'sequelize-typescript';

export class ModelBase extends Model {
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

  @AllowNull(false)
  @UpdatedAt
  @Default(DataType.NOW)
  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;
}
