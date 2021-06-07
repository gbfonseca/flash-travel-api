export default () => ({
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    type: process.env.DB_TYPE,
    postgres: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
  },
});
