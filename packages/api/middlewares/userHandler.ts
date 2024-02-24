import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/customTypes";
import { getUser, addUser } from "#services/users/users.service";

export const userHandler = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("User Handler:", req.user);
  const user = await getUser(req.user?.username);
  if (!user) {
    await addUser(req.user?.username, 1);
  } else {
    console.log("User has been found:", user);
  }
  next();
};
