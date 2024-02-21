import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  console.log("Request: ", req);

  res.locals.data = {
    messsage: "LOGIN.",
    timestamp: Date.now(),
  };
  next();
};
