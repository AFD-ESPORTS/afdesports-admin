import {
  checkSchema,
  validationResult,
  ValidationChain,
  Schema,
} from "express-validator";
import { CustomError } from "./errorHandler";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    const errorMessage = new CustomError(
      400,
      errors.array().map((error) => error.msg),
      { req, res, next }
    );
    next(errorMessage);
  }
  next();
};

export const validateSchema = (
  schema: Schema
): (any | ValidationChain | typeof handleValidationErrors)[] => {
  return [...checkSchema(schema), handleValidationErrors];
};
