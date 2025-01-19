"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Async handler utility to catch async errors
const asyncHandler = (fn) => {
    if (typeof fn !== 'function') {
        throw new Error('Expected a function as the argument');
    }
    return (req, res, next) => {
        // Return a promise and catch any errors
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.default = asyncHandler;
