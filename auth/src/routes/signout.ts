import express from "express";
import { MethodNotAllowedError } from "@pdtg-ticketing/common";
const router = express.Router();

const route = "/api/users/signout";
router.post(route, (req, res) => {
  req.session = null;
  res.send({});
});
router.all(route, (req, res) => {
  if (req.method !== "OPTIONS") {
    throw new MethodNotAllowedError(req.method, "POST");
  }
  res.send({});
});

export { router as signoutRouter };
