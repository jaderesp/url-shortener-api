const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password123',
  database: process.env.DATABASE_NAME || 'shortenerUrl',
  logging: console.log
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco estabelecida com sucesso!');
    
    // Testar criação de tabela
    await sequelize.query('CREATE TABLE IF NOT EXISTS test (id SERIAL PRIMARY KEY, name VARCHAR(255))');
    console.log('✅ Tabela de teste criada com sucesso!');
    
    await sequelize.close();
    console.log('✅ Conexão fechada com sucesso!');
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
  }
}

testConnection(); 