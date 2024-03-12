import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { CustomError } from "./errorHandler";
import { ExtendedRequest } from "../types/customTypes";

export const tokenHandler = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.routeConfig.config?.requireAuth === undefined ||
    req.routeConfig.config?.requireAuth === true ||
    (Array.isArray(req.routeConfig.config?.requireAuth) &&
      req.routeConfig.config?.requireAuth.includes(req.method))
  ) {
    if (
      process.env.NODE_ENV === "development" &&
      req.body?.tokenType === "magic-token"
    ) {
      req.user = {
        id: 1,
        username: "dev",
        firs_name: "dev",
        last_name: "DEV",
        email: "dev@dev.dev",
        is_superuser: true,
      };
      return next();
    }
    const token = req.headers["authorization"]?.slice(
      7,
      req.headers["authorization"]?.length
    );
    if (!token) {
      return next(
        new CustomError(403, ["No authentication token given."], {
          req,
          res,
          next,
        })
      );
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: unknown, decoded) => {
        if (err) {
          return next(
            new CustomError(500, ["Token authentication failed."], {
              req,
              res,
              next,
            })
          );
        }

        // Si tout est bon, enregistre la demande pour une utilisation dans d'autres routes
        req.user = decoded as JwtPayload;
        next();
      }
    );
  }
};
