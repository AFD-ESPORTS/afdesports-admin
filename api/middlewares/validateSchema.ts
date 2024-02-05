import {
  checkSchema,
  validationResult,
  ValidationChain,
} from "express-validator";
import { Request, Response, NextFunction } from "express";

export function validateSchema(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Valide la requête avec le schéma
    const validationChains: ValidationChain[] = checkSchema(schema);

    for (const validationChain of validationChains) {
      validationChain(req, res, (err) => {
        if (err) {
          return res.status(400).json({ errors: err.array() });
        }
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
}
