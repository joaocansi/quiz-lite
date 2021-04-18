import { NextFunction, Request, Response } from "express";

export default class AppError {
  public readonly message: string;
  public readonly status: number;

  constructor(message: string, status = 400) {
    this.message = message;
    this.status = status;
  }
}

export const expressAsyncErrorsHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({ status: 'error', message: error.message });
  }
  return res.status(500).json({ status: 'error', message: 'Internal server error' });
}