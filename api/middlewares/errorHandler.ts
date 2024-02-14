import { Request, Response, NextFunction } from "express";
import * as Sentry from "@sentry/node";

type ErrorContext = {
  [key: string]: any;
} | null;

interface Package {
  req: Request;
  res: ExpressResponse;
  next: NextFunction;
}

interface ExpressResponse extends Response {
  sentry?: string;
}

export class CustomError extends Error {
  public code: number;
  public context: ErrorContext;
  public reqPackage: Package;

  constructor(code: number, context: ErrorContext, reqPackage: Package) {
    super(context?.join(" ") || "An unknown error occured.");
    this.code = code;
    this.context = context;
    this.reqPackage = reqPackage;
  }
}

export function errorHandler(err: any, reqPackage: Package) {
  console.log("Error handler called");

  const { req, res, next } = reqPackage;
  if (err instanceof CustomError) {
    console.log("Error handler context:", err?.context);
    // console.log(res.sentry);
    if (err.code) {
      Sentry.captureException(new Error(err?.context?.join(" ")));
      res.status(err.code).json({
        code: err.code,
        message:
          err.context?.join(" ") ||
          "An unknown error occured. Please try again later or contact administrator.",
        sentryId: res?.sentry,
      });
    } else {
      next();
    }
  } else {
    console.log("Unhandled error:");
    console.error(err.stack);
    res.status(500).json({
      message:
        "An unknown error occured. Please try again later or contact administrator.",
      errorStack: err.stack,
    });
  }
}
