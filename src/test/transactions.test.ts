import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import request from "supertest";
import { app } from "../app";

describe("Transcations routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  it("should create a new transaction", async () => {
    const reply = await request(app.server).post("/transactions").send({
      title: "new transaction",
      amount: 5000,
      type: "credit",
    });
    expect(reply.statusCode).toEqual(201);
  });

  it("should list all transactions", async () => {
    const createTransactionReply = await request(app.server)
      .post("/transactions")
      .send({
        title: "new transaction",
        amount: 5000,
        type: "credit",
      });
    const cookies = createTransactionReply.get("Set-Cookie");

    const transactionsListReply = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies);
    expect(transactionsListReply.statusCode).toEqual(200);
    expect(transactionsListReply.body.transactions).toEqual([
      expect.objectContaining({
        title: "new transaction",
        amount: 5000,
      }),
    ]);
  });
});
