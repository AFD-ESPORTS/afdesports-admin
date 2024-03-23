import { Request, Response, NextFunction } from "express";
import { controller } from "./loldatas.ctrl";

export default async (req: Request, res: Response, next: NextFunction) => {
  // console.log("Request: ", req);
  try {
    const lolDatas = await controller(req, res, next);

    res.locals.data = lolDatas;
  } catch (error) {
    // console.error("Error in route: ", error);
    next(error);
  }
  next();
};
