/**
 *
 * This handles requests, responses and errors generically from the Express Routing middleware.
 * @module MIDDLEWARE:HTTP
 */
import { Request, Response, NextFunction } from 'express';

import Constants from '../utilities/Constants';
import processResponse, {
    MethodNotAllowedError,
    HTTPVersionNotSupportedError,
} from '../utilities/HTTPResponses';

/**
 *
 * This middleware checks to verify that all requests use HTTP/1.1 to ensure compatibility.
 * @param {object} request Express request object
 * @param {object} response Express response object
 * @param {object} next Express next function
 */
function verifyHTTPVersion(request: Request, response: Response, next: NextFunction) {
    if (Number(request.httpVersion) < 1.1) {
        request.payload = processResponse(
            new HTTPVersionNotSupportedError(Constants.HTTPResponse.ServerError)
        );

        processRequestErrorResponse(request, response, next);
    } else {
        next();
    }
}

/**
 *
 * This middleware checks to verify that all requests are of the specified methods.
 * @param {object} request Express request object
 * @param {object} response Express response object
 * @param {object} next Express next function
 */
function verifyRequestMethod(request: Request, response: Response, next: NextFunction) {
    if (Constants.AllowedMethods.includes(request.method)) {
        next();
    } else {
        request.payload = processResponse(
            new MethodNotAllowedError(Constants.HTTPResponse.ClientError)
        );

        processRequestErrorResponse(request, response, next);
    }
}

/**
 *
 * This middleware pre-formats, sets all request headers and intercept bad requests.
 * @param {object} request Express request object
 * @param {object} response Express response object
 * @param {object} next Express next function
 */
function setupRequest(request: Request, response: Response, next: NextFunction) {
    request.headers['access-control-allow-origin'] = '*';
    request.headers['access-control-allow-headers'] = '*';

    if (request.method === 'OPTIONS') {
        request.headers['access-control-allow-methods'] = Constants.AllowedMethods.toString();
        response.status(200).json();
    } else {
        next();
    }
}

/**
 *
 * This middleware processes and returns all the Successful responses to the Client.
 * @param {object} request Express request object
 * @param {object} response Express response object
 * @param {object} next Express next function
 */
function processRequestSuccessResponse(request: Request, response: Response, next: NextFunction) {
    const { status, text, payload } = request.payload;

    if (payload) {
        response.status(status).json({ status, text, payload, error: null });
    } else {
        next();
    }
}

/**
 *
 * This middleware processes, logs and returns all failed responses to the Client.
 * @param {object} request Express request object. Unused in this function.
 * @param {object} response Express response object
 * @param {object} _next Express next function. Unused in this function.
 */
function processRequestErrorResponse(request: Request, response: Response, _next: NextFunction) {
    const { status, text, error } = request.payload;

    response.status(status).json({
        status,
        text,
        error,
        payload: null,
    });
}

export {
    verifyHTTPVersion,
    verifyRequestMethod,
    setupRequest,
    processRequestSuccessResponse,
    processRequestErrorResponse,
};
