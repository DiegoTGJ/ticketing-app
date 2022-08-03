import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import {
  validateRequest,
  BadRequestError,
  MethodNotAllowedError,
} from "@pdtg-ticketing/common";
import { User } from "../models/user";

const router = express.Router();
const route = "/api/users/signup";

router.post(
  route,
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    //Store it on session object
    req.session = {
      jwt: userJwt,
    };

    console.log("Created New User");
    res.status(201).send(user);
  }
);
router.all(route, (req, res) => {
  if (req.method !== "OPTIONS") {
    throw new MethodNotAllowedError(req.method, "POST");
  }
  res.send({});
});
export { router as signupRouter };
