const env = {
    database: 'companydb',
    username: 'postgres',
    password: 'asd@123A',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  module.exports = env;