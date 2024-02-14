import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  // Votre logique de contrôleur ici

  // Par exemple, si vous voulez renvoyer une réponse JSON :
  res.json({ message: "Votre requête a été traitée avec succès." });
};
