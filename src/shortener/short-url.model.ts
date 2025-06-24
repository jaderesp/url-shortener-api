import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table({ tableName: 'short_urls', paranoid: true })
export class ShortUrl extends Model<ShortUrl> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare originalUrl: string;

  @AllowNull(false)
  @Column(DataType.STRING(6))
  declare shortCode: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare userId: number | null;

  @BelongsTo(() => User)
  declare user?: User;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare clickCount: number;

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