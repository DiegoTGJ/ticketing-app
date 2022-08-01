import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-request";
import { MethodNotAllowedError } from "../errors/method-not-allower-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";

const router = express.Router();
const route = "/api/users/signin";
router.post(
  route,
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }

    const passwordIsCorrect = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordIsCorrect) {
      throw new BadRequestError("Invalid Credentials");
    }

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );
    //Store it on session object
    req.session = {
      jwt: userJwt,
    };
    console.log("User Signed In");
    res.status(200).send({});
  }
);
router.all(route, (req, res) => {
  if (req.method !== "OPTIONS") {
    throw new MethodNotAllowedError(req.method, "POST");
  }
  res.send({});
});

export { router as signinRouter };
