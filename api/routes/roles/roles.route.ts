import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  // console.log(req);

  // Ici, tu peux accéder au corps de la requête avec req.body
  // et aux paramètres de la requête avec req.params

  // Fais quelque chose avec la requête ici, par exemple :
  console.log("Corps de la requête :", req.body);
  console.log("Paramètres de la requête :", req.params);

  // Ensuite, envoie une réponse. Par exemple :
  res.locals.data = {
    messsage: "Votre requête a été traitée avec succès.",
    timestamp: Date.now(),
  };
  next();
};
