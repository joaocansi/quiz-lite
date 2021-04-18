module.exports = {
  type: "postgres",
  url: "postgres://postgres:postgres@localhost:5432/quiz_lite",
  entities: [ "./src/modules/**/typeorm/entities/**/*.ts" ],
  migrations: [ "./src/shared/database/migrations/**/*.ts" ],
  cli: {
    migrationsDir: "./src/shared/database/migrations"
  }
}