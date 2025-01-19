"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message = "Soemthing went wrong!", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        console.log(message);
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
;
exports.default = ApiError;
