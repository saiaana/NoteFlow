class AppError extends Error {
  constructor(message, statusCode, code = "UNKNOWN_ERROR") {
    super(message);

    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith(4) ? "fail" : "error";
    this.code = code;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
