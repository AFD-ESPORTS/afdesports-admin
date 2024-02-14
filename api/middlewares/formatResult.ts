import { Request, Response } from "express";

export function formatResult(req: Request, res: Response): void | Object {
  console.log("Route:", req.url);
  console.log("Response:", res.locals);

  res.json(res.locals.data);
}
