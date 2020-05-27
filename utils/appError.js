class AppError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.isOperation = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
