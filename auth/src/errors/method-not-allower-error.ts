import { CustomError } from "./custom-error";

export class MethodNotAllowedError extends CustomError {
  statusCode = 405;
  constructor(public method: string, public allowedMethods: string) {
    super("Method not allowed");
    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
  }

  serializeErrors = () => {
    return [
      { message: "Method " + this.method + " not allowed on this route" },
    ];
  };
}
