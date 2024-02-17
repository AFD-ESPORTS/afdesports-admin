import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/customTypes";

export const userHandler = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("User Handler:", req.user);

  next();
};
