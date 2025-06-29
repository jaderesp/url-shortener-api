import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule, UsersService],
  providers: [UsersService],
  controllers: [],
})
export class UsersModule { } 