import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, AllowNull, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;

  @DeletedAt
  @Column(DataType.DATE)
  declare deletedAt: Date;
} 