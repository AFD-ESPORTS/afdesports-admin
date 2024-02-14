import { Request, Response, NextFunction } from "express";
import { register } from "prom-client";

export default async (req: Request, res: Response, next: NextFunction) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
};
