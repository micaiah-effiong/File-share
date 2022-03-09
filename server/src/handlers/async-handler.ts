import { Request, Response, NextFunction } from "express";
import { MiddlewareFunction } from "../types";

export default function (fn: MiddlewareFunction) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
