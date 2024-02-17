import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  res.locals.data = {
    messsage: "Votre requête a été traitée avec succès.",
    timestamp: Date.now(),
  };
  next();
};
