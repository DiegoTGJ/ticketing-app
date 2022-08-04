import { TicketAttrs } from "../model/ticket";
import { Ticket } from "../model/ticket";

const ticketPayload = {
  title: "Title 1",
  price: 11,
  userId: "1651651",
};
const ticketPayload2 = {
  title: "Title 2",
  price: 14,
  userId: "165165111",
};
const ticketPayload3 = {
  title: "Title 3",
  price: 15,
  userId: "123123",
};

const ticketPayloads = [ticketPayload, ticketPayload2, ticketPayload3];
const createTicket = async (payload: TicketAttrs) => {
  const ticket = Ticket.build(payload);
  await ticket.save();
  return ticket;
};

export { createTicket, ticketPayloads };
