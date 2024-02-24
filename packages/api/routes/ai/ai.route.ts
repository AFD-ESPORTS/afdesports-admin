import { Request, Response, NextFunction } from "express";
import ai from "./ai.ctrl";

export default async (req: Request, res: Response, next: NextFunction) => {
  // Fais quelque chose avec la requête ici, par exemple :
  console.log("Corps de la requête :", req.body);
  console.log("Paramètres de la requête :", req.params);

  // Ensuite, envoie une réponse. Par exemple :
  res.locals.data = await ai(req, res, next);
  next();
};
