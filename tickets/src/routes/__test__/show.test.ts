import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../model/ticket";
import mongoose from "mongoose";
const route = "/api/tickets/";

const ticketPayload = {
  title: "some title",
  price: 123,
  userId: "123123",
};

it("returns 404 if ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(route + id)
    .send()
    .expect(404);
});
it("returns ticket if the ticket is found", async () => {
  const ticket = Ticket.build(ticketPayload);
  ticket.save();
  const res = await request(app)
    .get(route + ticket.id)
    .send()
    .expect(200);

  expect(res.body.title).toEqual(ticketPayload.title);
  expect(res.body.price).toEqual(ticketPayload.price);
  expect(res.body.userId).toEqual(ticketPayload.userId);
});
it("returns 404 if ticket is not found", async () => {});
it("returns 404 if ticket is not found", async () => {});
