import { NextFunction, Request, Response } from 'express';
import ErrorStatusCodes from '../Utils/ErrorStatusCodes';

class ErrorHandler {
  public static handle(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response {
    return res.status(
      ErrorStatusCodes[err.message as keyof typeof ErrorStatusCodes] || 500,
    ).json({ message: err.message });
  }
}

export default ErrorHandler;