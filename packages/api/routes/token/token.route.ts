import { Request, Response, NextFunction } from "express";
import { testToken } from "./token.ctrl";

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log("Token route:", req.body.header);

  res.locals.data = await testToken(req.body);
  next();
};
