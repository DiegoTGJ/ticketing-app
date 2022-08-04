import request from "supertest";
import { createTicket, ticketPayloads } from "../../test/utils";
import { app } from "../../app";
import mongoose from "mongoose";

const route = "/api/tickets/";

it("returns 401 if not authenticated", async () => {
  const ticket = await createTicket(ticketPayloads[0]);
  await request(app)
    .put(route + ticket.id)
    .expect(401);
});
it("returns a 401 if the user does not own the ticket", async () => {
  const ticket = await createTicket(ticketPayloads[0]);
  await request(app)
    .put(route + ticket.id)
    .set("Cookie", signin())
    .send({
      title: "New Title",
      price: 1000,
    })
    .expect(401);
});
it("returns a 404 if the provided id does not exist", async () => {
  await request(app)
    .put(route + new mongoose.Types.ObjectId().toHexString())
    .set("Cookie", signin())
    .send(ticketPayloads[0])
    .expect(404);
});
it("return a 400 if the user provides an invalid title", async () => {
  const ticket = await createTicket(ticketPayloads[0]);
  const cookie = signin(ticketPayloads[0].userId);

  const res = await request(app)
    .put(route + ticket.id)
    .set("Cookie", cookie)
    .send({ ...ticketPayloads[0], title: "" })
    .expect(400);
});
it("returns a 400 if the user provided an invalid price", async () => {
  const ticket = await createTicket(ticketPayloads[0]);
  const cookie = signin(ticketPayloads[0].userId);

  const res = await request(app)
    .put(route + ticket.id)
    .set("Cookie", cookie)
    .send({ ...ticketPayloads[0], price: 0 })
    .expect(400);
});
it("is updated with valid inputs", async () => {
  const ticket = await createTicket(ticketPayloads[0]);
  const cookie = signin(ticketPayloads[0].userId);

  await request(app)
    .put(route + ticket.id)
    .set("Cookie", cookie)
    .send({
      title: "test title",
      price: 500,
    })
    .expect(200);
});

it("is updated in the database", async () => {
  const ticket = await createTicket(ticketPayloads[0]);
  const cookie = signin(ticketPayloads[0].userId);

  await request(app)
    .put(route + ticket.id)
    .set("Cookie", cookie)
    .send({
      title: "test title",
      price: 500,
    });

  const res = await request(app)
    .get(route + ticket.id)
    .send();
  expect(res.body.title).toEqual("test title");
  expect(res.body.price).toEqual(500);
});
