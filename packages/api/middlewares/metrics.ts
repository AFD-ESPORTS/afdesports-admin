import { Request, Response, NextFunction } from "express";
import { Counter, Gauge, collectDefaultMetrics, register } from "prom-client";

register.setDefaultLabels({
  app: "api",
});
collectDefaultMetrics({ register });

// Créer un nouveau compteur pour enregistrer le nombre total de requêtes
const requestsCounter = new Counter({
  name: "total_requests",
  help: "Total numberof received requests",
});

const http_request_counter = new Counter({
  name: "http_request_count",
  help: "Count of HTTP requests made to API endpoints",
  labelNames: ["method", "route", "statusCode"],
});

// Créer une nouvelle jauge pour enregistrer le nombre de connexions actives
const activeConnectionsCounter = new Gauge({
  name: "active_connections",
  help: "Number of active connections",
});

export const metricsHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.path !== "/metrics") {
    requestsCounter.inc();
    activeConnectionsCounter.inc();
    http_request_counter
      .labels({
        method: req.method,
        route: req.originalUrl,
        statusCode: res.statusCode,
      })
      .inc();

    // Assurez-vous de décrémenter la jauge lorsque la réponse est terminée
    res.on("finish", () => {
      activeConnectionsCounter.dec();
    });
  }
  next();
};
