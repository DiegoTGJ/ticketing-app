import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../model/ticket";

const route = "/api/tickets";

it("has a route handler listening for post requests", async () => {
  const res = await request(app).post(route).send({});
  expect(res.status).not.toEqual(404);
});
it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});
it("returns status 201 if user is signed in", async () => {
  await request(app)
    .post(route)
    .set("Cookie", signin())
    .send({
      title: "asdasd",
      price: 11,
    })
    .expect(201);
});
it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post(route)
    .set("Cookie", signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post(route)
    .set("Cookie", signin())
    .send({
      price: 10,
    })
    .expect(400);
});
it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post(route)
    .set("Cookie", signin())
    .send({
      title: "Rock and Metal",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post(route)
    .set("Cookie", signin())
    .send({
      title: "Rock and Metal",
    })
    .expect(400);
});
it("creates a ticket with valid input", async () => {
  // add check ticket is saved to database
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  await request(app)
    .post(route)
    .set("Cookie", signin())
    .send({
      title: "Rock and Metal",
      price: 10,
    })
    .expect(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(10);
  expect(tickets[0].title).toEqual("Rock and Metal");
});
