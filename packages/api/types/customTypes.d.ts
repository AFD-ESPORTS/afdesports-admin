import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { RouteConfig } from "./routeConfig";
import { Schema } from "express-validator";

export interface AvailableRoute {
  routeName: string;
  routePath: string;
  schema: Schema;
  config: RouteConfig;
}

export interface ExtendedRequest extends Request {
  user?: JwtPayload;
  routeConfig: AvailableRoute;
}
