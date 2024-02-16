import { Request, Response, NextFunction } from "express";
import generateToken from "./token.ctrl";

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log("Corps de la requête :", req.body);
  res.locals.data = await generateToken(req.body);
  next();
};
