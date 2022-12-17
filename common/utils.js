import { errorCodes, errorTypes } from './constants.js';
import { ApiError, BaseError, InvalidRequestError } from './errors.js';

export function customErrorHandler(error, request, reply) {
  if (error instanceof BaseError) {
    return reply.status(error.statuCode).send(error.toJson());
  }

  if (error.statusCode === 500) {
    error = new ApiError();
  }

  if (error.statusCode === 404) {
    error = new InvalidRequestError(error.message, 404, errorCodes.routeNotFound);
  }

  if (error instanceof BaseError) {
    return reply.status(error.statusCode).send(error.toJson());
  }

  if (error.statusCode) {
    const errorPayload = {
      ok: false,
      error: {
        code: errorCodes.parameterMissingOrInvalid,
        type: errorTypes.invalidRequestError,
        message: error.message,
        ...error,
      },
    };
    if (errorPayload.error.statusCode) {
      delete errorPayload.error.statusCode;
    }

    reply.status(400).send(errorPayload);
  } else {
    console.log(error, error.trace);
    error = new ApiError();
    reply.status(error.statuCode).send(error.toJson());
  }
}
