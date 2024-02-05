import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import express from "express";
import type { Request, Response, NextFunction, Router } from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Middlewares
import errorHandler, { CustomError } from "./middlewares/errorHandler";
import { validateSchema } from "./middlewares/validateSchema";
import { Schema } from "express-validator";

dotenv.config();

interface ExpressResponse extends Response {
  sentry?: string;
}

const app = express();
const port = process.env.API_LISTEN_PORT;

Sentry.init({
  dsn: process.env.SENTRY_DSN,
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
  username: "sentryAlter",
  email: "gillescognin@gmail.com",
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Preparing availables routes
const availableRoutes: Array<Object> = [];
const routesPath: string = path.join(__dirname, "routes");
const routeFolders: string[] = fs.readdirSync(routesPath);

routeFolders.forEach(async (folder: string) => {
  const routePath: string = path.join(routesPath, folder, folder + ".route.ts");
  const routeValidatorSchema: string = path.join(
    routesPath,
    folder,
    "schema.json"
  );
  const routeConfig: string = path.join(routesPath, folder, "config.json");
  // console.log("Route path:", routePath);
  // console.log("Route validator path:", routeValidatorSchema);

  if (
    fs.existsSync(routePath) &&
    fs.existsSync(routeValidatorSchema) &&
    fs.existsSync(routeConfig)
  ) {
    // console.log("Route file exists:", routePath);
    // import(routeValidatorSchema).then((schema: Schema) => {
    //   availableRoutes.push({
    //     routeNAme: folder,
    //     routePath: routePath,
    //     schema: schema,
    //   });
    // });
    availableRoutes.push({
      routeNAme: folder,
      routePath: routePath,
      schema: await import(routeValidatorSchema),
      config: await import(routeConfig),
    });
    // const router: Router = express.Router();

    // import(routeValidatorSchema).then((schema) => {
    //   console.log("Schema:", schema);
    // });
    // import(routePath).then((route) => {
    //   route.default(router);
    //   app.use(
    //     `/${folder}`,
    //     // validateSchema(),
    //     router
    //   );
    // });
  } else {
    console.error(
      "/!\\ Route file or schema file or route config file does not exist for route:",
      folder
    );
  }
});

// Global route handler
app.all("*", (req: Request, res: ExpressResponse, next: NextFunction) => {
  console.log(req.method, req.url);
  Sentry.setUser({
    ip_address: req.ip,
  });
  if (availableRoutes.length > 0) {
    console.log("Available routes:", availableRoutes);
  } else {
    console.error("No route available");
    next(
      new CustomError(
        404,
        [
          "Route file or schema file or config file does not exist for route:",
          req.url,
        ],
        { req, res, next }
      )
    );
  }
  next();
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Error handler
app.use(function onError(
  err: any,
  req: Request,
  res: ExpressResponse,
  next: NextFunction
) {
  res.statusCode = 500; // default status code
  errorHandler(err, { req, res, next });
  next();
});

app.listen(port, () => {
  console.log(`L'API est lancée sur le port ${port}`);
  Sentry.setUser(null);
});
