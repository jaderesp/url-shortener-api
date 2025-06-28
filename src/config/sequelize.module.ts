import { SequelizeModule } from '@nestjs/sequelize';

export const sequelizeConfig = SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.DATABASE_HOST || 'db',
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password123',
    database: process.env.DATABASE_NAME || 'shortenerUrl',
    autoLoadModels: true,
    synchronize: true, // Em produção, usar migrations!
    logging: false,
    dialectOptions: {
        ssl: false,
        // Desabilitar SSL para desenvolvimento local
        rejectUnauthorized: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    retry: {
        max: 3,
        timeout: 3000
    }
})