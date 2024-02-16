import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "./errorHandler";

interface RequestWithUser extends Request {
  user?: JwtPayload;
}

export function tokenHandler(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.slice(
    7,
    req.headers["authorization"]?.length
  );
  console.log("Token:", token);
  console.log("Original TOKEN", process.env.JWT_SECRET);

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
    req.user = (decoded as JwtPayload).id;
    next();
  });
}
