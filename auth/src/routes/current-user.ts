import express from "express";
import { MethodNotAllowedError } from "../errors/method-not-allower-error";
import { currentUser } from "../middlewares/current-user";
const router = express.Router();

const route = "/api/users/currentuser";

router.get(route, currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

router.all(route, (req, res) => {
  if (req.method !== "OPTIONS") {
    throw new MethodNotAllowedError(req.method, "GET");
  }
  res.send({});
});

export { router as currentuserRouter };
