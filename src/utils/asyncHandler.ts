import { Request, Response, NextFunction } from 'express';

// Async handler utility to catch async errors
const asyncHandler = (fn: Function) => {
  if (typeof fn !== 'function') {
    throw new Error('Expected a function as the argument');
  }

  return (req: Request, res: Response, next: NextFunction) => {
    // Return a promise and catch any errors
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
