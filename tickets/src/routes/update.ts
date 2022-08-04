import {
  NotFoundError,
  requireAuth,
  validateRequest,
  NotAuthorizedError,
} from "@pdtg-ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../model/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({ title, price });
    await ticket.save();

    res.status(200).send(ticket);
  }
);

export { router as updateTicketRouter };
