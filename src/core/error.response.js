const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    UNAUTHORIZED: 401,
}

const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error',
    UNAUTHORIZED: 'Unauthorized error',
}


class ErrorResponse extends Error {
  constructor(message, status) {
      super(message);
      this.status = status;
  }
}

class ConflictRequest extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT,statusCode = StatusCode.CONFLICT) {
      super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN,statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode);
    }
}

class AuthFailError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT,statusCode = StatusCode.UNAUTHORIZED) {
        super(message, statusCode);
    }
}

module.exports = {
    ConflictRequest,
    BadRequestError,
    AuthFailError
}