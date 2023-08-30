import fastify from "fastify";
import crypto from "node:crypto";
import { knex } from "./database";
import { env } from "./env";

const app = fastify();

app.get("/hello", async (req, res) => {
  const transaction = await knex("transactions").select("*");
  return transaction;
});

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP server running on port ${env.PORT}`);
});
