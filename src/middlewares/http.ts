/**
 *
 * This handles requests, responses and errors generically from the Express Routing middleware.
 * @module MIDDLEWARE:HTTP
 */

import { Request, Response, NextFunction } from 'express';

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
        request.headers['access-control-allow-methods'] = 'GET, POST, PUT, PATCH, DELETE';
        response.status(200).json();
    }

    next();
}

/**
 *
 * This middleware processes and returns all the Successful responses to the Client.
 * @param {object} request Express request object
 * @param {object} response Express response object
 * @param {object} next Express next function
 * @returns {object} Express response object, formatted using the payload on the request param.
 */
function processRequestSuccessResponse(
    request: Request,
    response: Response,
    next: NextFunction
): Response {
    const { status, payload } = request.payload;

    if (!payload) next();

    return response.status(status).json({ status, payload, error: null });
}

/**
 *
 * This middleware processes, logs and returns all failed responses to the Client.
 * @param {Error} error Error being returned to the front-end from the Error constructor.
 * @param {object} request Express request object. Unused in this function.
 * @param {object} response Express response object
 * @param {object} next Express next function. Unused in this function.
 * @returns {object} Express response object, formatted using the error param.
 */
function processRequestErrorResponse(
    request: Request,
    response: Response,
    next: NextFunction
): Response {
    const { status, error } = request.error;

    return response.status(status).json({
        status,
        error,
        payload: null,
    });
}

export { setupRequest, processRequestSuccessResponse, processRequestErrorResponse };
