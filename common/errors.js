import { errorCodes, errorTypes } from './constants.js';

export class BaseError extends Error {
  constructor(type, message, statusCode, code = null) {
    super(message);
    this.message = message;
    this.type = type;
    this.code = code;
    this.statuCode = statusCode;
  }

  toJson() {
    const result = {
      ok: false,
      error: {
        message: this.message,
        code: this.code,
        type: this.type,
      },
    };
    if (!result.error.code) {
      delete result.error.code;
    }

    return result;
  }
}

export class ApiError extends BaseError {
  constructor(message = 'Something went wrong on piperchat server end') {
    super(errorTypes.apiError, message, 500);
  }
}

export class InvalidRequestError extends BaseError {
  constructor(message, statusCode, code) {
    super(errorTypes.invalidRequestError, message, statusCode, code);
    this.code = code;
  }
}

export class ParameterMissingOrInvalid extends InvalidRequestError {
  constructor(message = 'One or more required fields are missing or invalid') {
    super(message, 400, errorCodes.parameterMissingOrInvalid);
  }
}

export class PermissionDenied extends InvalidRequestError {
  constructor(message = 'You do not have enough permissions to perform this operation') {
    super(message, 403, errorCodes.permissionDenied);
  }
}

export class ResourceMissing extends InvalidRequestError {
  constructor(message) {
    super(message, 404, errorCodes.resourceMissing);
  }
}

export class AuthenticationError extends InvalidRequestError {
  constructor(message) {
    super(message, 401, errorCodes.unAuthenticated);
  }
}
