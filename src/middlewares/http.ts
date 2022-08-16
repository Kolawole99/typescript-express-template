/**
 *
 * This handles requests, responses and errors generically from the Express Routing middleware.
 * @module MIDDLEWARE:HTTP
 */
import Constants from '../utilities/Constants';
import processResponse, {
    MethodNotAllowedError,
    NotFoundError,
    HTTPVersionNotSupportedError,
} from '../utilities/HTTPResponses';

/**
 *
 * This middleware checks to verify that all requests use HTTP/1.1 to ensure compatibility.
 * @param {object} request Express request object
 * @param {object} response Express response object
 * @param {object} next Express next function
 */
function verifyHTTPVersion(request: ERequest, response: EResponse, next: ENextFunction) {
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
function verifyRequestMethod(request: ERequest, response: EResponse, next: ENextFunction) {
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
function setupRequest(request: ERequest, response: EResponse, next: ENextFunction) {
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
function processRequestSuccessResponse(
    request: ERequest,
    response: EResponse,
    next: ENextFunction
) {
    const { payload } = request;

    if (payload && !payload.error) {
        const { status, text } = payload;

        response.status(status).json({
            status,
            text,
            payload: payload.payload,
            error: null,
        });
    } else {
        next();
    }
}

/**
 *
 * This middleware receives, processes and sends to handleError all Services 404 Errors.
 * @param {object} request Express request object. Unused in this function.
 * @param {object} _response Express response object. Unused in this function.
 * @param {object} next Express next function
 */
function process404(request: ERequest, _response: EResponse, next: ENextFunction) {
    const { payload } = request;

    if (!payload) {
        request.payload = processResponse(new NotFoundError(Constants.HTTPResponse.ClientError));
    }

    next();
}

/**
 *
 * This middleware processes, logs and returns all failed responses to the Client.
 * @param {object} request Express request object. Unused in this function.
 * @param {object} response Express response object
 * @param {object} _next Express next function. Unused in this function.
 */
function processRequestErrorResponse(request: ERequest, response: EResponse, _next: ENextFunction) {
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
    process404,
    processRequestErrorResponse,
};
