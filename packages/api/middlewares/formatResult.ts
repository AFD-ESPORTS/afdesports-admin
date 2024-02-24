import { Request, Response } from "express";

export const formatResult = (req: Request, res: Response): void | Object => {
  res.json(res.locals.data);
};
