module.exports = {
  development: {
    dialect: "mysql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME
  },
  test: {
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOSTNAME_PROD,
    dialect: "mysql"
    // use_env_variable: "DATABASE_URL"
  }
};
