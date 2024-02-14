import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "./errorHandler";
import { log } from "console";

interface RequestWithUser extends Request {
  userId?: string;
}

export function tokenHandler(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];
  log("Token:", token);

  if (!token) {
    return next(
      new CustomError(403, ["No authentication token given."], {
        req,
        res,
        next,
      })
    );
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded) => {
    log(
      "Token:",
      token,
      "Original TOKEN:",
      process.env.JWT_SECRET,
      "Decoded:",
      decoded,
      "Error:",
      err
    );
    if (err) {
      next(
        new CustomError(500, ["Token authentication failed."], {
          req,
          res,
          next,
        })
      );
    }

    // Si tout est bon, enregistre la demande pour une utilisation dans d'autres routes
    req.userId = (decoded as JwtPayload).id;
    next();
  });
}
