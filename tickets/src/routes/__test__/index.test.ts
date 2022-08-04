import request from "supertest";
import { app } from "../../app";
import { createTicket, ticketPayloads } from "../../test/utils";

const route = "/api/tickets/";

it("can fetch a list of tickets", async () => {
  await createTicket(ticketPayloads[0]);
  await createTicket(ticketPayloads[1]);
  await createTicket(ticketPayloads[2]);

  const res = await request(app).get(route).expect(200);
  expect(res.body.length).toEqual(3);
  expect(res.body[0].title).toEqual(ticketPayloads[0].title);
  expect(res.body[1].title).toEqual(ticketPayloads[1].title);
  expect(res.body[2].title).toEqual(ticketPayloads[2].title);
});
