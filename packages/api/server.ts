import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import _ from "lodash";

// Types
import type { Request, Response, NextFunction, Router } from "express";
import type { AvailableRoute, ExtendedRequest } from "./types/customTypes";

// Middlewares
import { errorHandler, CustomError } from "./middlewares/errorHandler";
import { validateSchema } from "./middlewares/validateSchema";
import { tokenHandler } from "./middlewares/tokenHandler";
import { formatResult } from "./middlewares/formatResult";
import { metricsHandler } from "./middlewares/metrics";
import { userHandler } from "./middlewares/userHandler";

dotenv.config();

interface ExpressResponse extends Response {
  sentry?: string;
}

const app = express();
const port = process.env.API_PORT;

app.use(express.json());

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
Sentry.setUser({
  id: 0,
  username: "sentryUser",
  email: "decoy@invalidmail.com",
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Metrics for Prometheus
app.use(metricsHandler);

// Preparing availables routes
const availableRoutes: Array<AvailableRoute> = [];
const routesPath: string = path.join(__dirname, "routes");
const routeFolders: string[] = fs.readdirSync(routesPath);

for (const folder of routeFolders) {
  const routePath: string = path.join(routesPath, folder, folder + ".route.ts");
  const routeValidatorSchema: string = path.join(
    routesPath,
    folder,
    "schema.json"
  );
  const routeConfig: string = path.join(routesPath, folder, "config.json");

  if (
    fs.existsSync(routePath) &&
    fs.existsSync(routeValidatorSchema) &&
    fs.existsSync(routeConfig)
  ) {
    const config = require(routeConfig);
    if (config?.envEnabled?.includes(process.env.NODE_ENV)) {
      console.log("> Route enabled for env:", process.env.NODE_ENV, folder);

      const route = require(routePath);
      const schema = require(routeValidatorSchema);

      availableRoutes.push({
        routeName: folder,
        routePath: routePath,
        schema: schema,
        config: config,
      });

      const router: Router = express.Router();
      const middlewares = [
        (req: ExtendedRequest, res: ExpressResponse, next: NextFunction) => {
          req.routeConfig = {
            routeName: folder,
            routePath: routePath,
            schema: schema,
            config: config,
          };
          next();
        },
        validateSchema(schema),
        route.default,
        (req: ExtendedRequest, res: ExpressResponse, next: NextFunction) => {
          tokenHandler(req, res, next);
          userHandler(req, res, next);
          next();
        },
      ];
      router.use(middlewares);
      app.use(`/${folder}`, router);
    }
  } else {
    console.error(
      "/!\\ Route file or schema file or route config file does not exist for route:",
      folder
    );
  }
}

// Managing unknown routes
app.use((req, res, next) => {
  if (
    _.find(availableRoutes, {
      routeName: new URL(
        `${req.protocol}://${req.get("host")}${req.originalUrl}`
      ).pathname.split("/")[1],
    })
  ) {
    return next();
  }
  const error = new CustomError(404, ["No route found for", req.url], {
    req,
    res,
    next,
  });
  next(error);
});

// Returning the result through formating middleware
app.use(formatResult);

// Error handler joining error feedback from API and Sentry
app.use(function onError(
  err: any,
  req: Request,
  res: ExpressResponse,
  next: NextFunction
) {
  res.statusCode = 500; // default status code
  Sentry.Handlers.errorHandler()(err, req, res, next);
  errorHandler(err, { req, res, next });
});

app.listen(port, () => {
  console.log(
    `\x1b[105m \x1b[100m \x1b[32m API started on port ${port} \x1b[0m`
  );
  Sentry.setUser(null);
});
