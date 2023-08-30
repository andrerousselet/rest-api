import { knex as knexSetup, Knex } from "knex";

export const knex: Knex = knexSetup({
  client: "sqlite",
  connection: {
    filename: "./db/app.db",
  },
  useNullAsDefault: true,
});
