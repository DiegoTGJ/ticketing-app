import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import { MethodNotAllowedError } from "../errors/method-not-allower-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MethodNotAllowedError)
    res.setHeader("Allow", err.allowedMethods);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
