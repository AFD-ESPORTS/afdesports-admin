import { NextFunction } from "express";

export default async function generateToken(req: Request): Promise<Object> {
  return { message: "LET'S GOOOOO." };
}
