import request from "supertest";
import { app } from "../../app";

const route = "/api/tickets";

it("has a route handler listening for post requests", async () => {
  const res = await request(app).post(route).send({});
  expect(res.status).not.toEqual(404);
});
it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});
it("returns status 201 if user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(201);
});
it("returns an error if an invalid title is provided", async () => {});
it("returns an error if an invalid price is provided", async () => {});
it("creates a ticket with valid input", async () => {});
