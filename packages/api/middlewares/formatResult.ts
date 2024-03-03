import { Request, Response } from "express";

export const formatResult = (req: Request, res: Response): void | object => {
  res.json(res.locals.data);
};
