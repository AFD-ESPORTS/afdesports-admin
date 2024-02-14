import { NextFunction } from "express";

export default async function generateToken(req: Request): Promise<Object> {
  console.log("Corps de la requête :", req.body);
  // Ensuite, envoie une réponse. Par exemple :
  return { message: "LET'S GOOOOO." };
}
