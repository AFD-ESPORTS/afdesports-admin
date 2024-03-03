import { Request, Response, NextFunction } from "express";
import { controller } from "./login.ctrl";
import { ExtendedUserDatas } from "#root/types/discordTypes";

export default async (req: Request, res: Response, next: NextFunction) => {
  // console.log("Request: ", req);
  try {
    const fetchUserDatas: ExtendedUserDatas | Error | undefined =
      await controller(req, res, next);

    res.locals.data = fetchUserDatas;
  } catch (error) {
    // console.error("Error in route: ", error);
    next(error);
  }
  next();
};
