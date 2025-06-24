import { SequelizeModule } from '@nestjs/sequelize';

export const sequelizeConfig = SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadModels: true,
    synchronize: true, // Em produção, usar migrations!
    logging: false,
})