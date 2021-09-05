require('dotenv').config();

const {
  DB_NAME, 
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DATABASE_URL
} = process.env;

module.exports ={
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql"
  },
  test: {
    url: DATABASE_URL,
    dialect: "mysql"
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql"
  },
}
