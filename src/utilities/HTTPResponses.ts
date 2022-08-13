/**
 * This modules handles the global classes for all application App Errors extending the inbuilt Error class
 * @module UTILITY:ApplicationErrors
 */
import Constants from './Constants';

interface HTTPResponseTypes {
    [key: string]: {
        [key: string]: { code: number; text: string };
    };
}

/**
 * This object defines the HTTP response types and their associated status codes.
 * This file should always be in sync with the Web convention for response status code.
 * A good resource to track is: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
const HTTPResponseTypes: HTTPResponseTypes = {
    Informational: {
        Continue: { code: 100, text: 'Continue' },
        SwitchingProtocols: { code: 101, text: 'Switching Protocols' },
        Processing: { code: 102, text: 'Processing' },
        EarlyHints: { code: 103, text: 'Early Hints' },
    },
    Successful: {
        OK: { code: 200, text: 'OK' },
        Created: { code: 201, text: 'Created' },
        Accepted: { code: 202, text: 'Accepted' },
        NonAuthoritativeInformation: { code: 203, text: 'Non-Authoritative Information' },
        NoContent: { code: 204, text: 'No Content' },
        ResetContent: { code: 205, text: 'Reset Content' },
        PartialContent: { code: 206, text: 'Partial Content' },
        MultiStatus: { code: 207, text: 'Multi-Status' },
        AlreadyReported: { code: 208, text: 'Already Reported' },
        IMUsed: { code: 226, text: 'IM Used' },
    },
    Redirection: {
        MultipleChoices: { code: 300, text: 'Multiple Choices' },
        MovedPermanently: { code: 301, text: 'Moved Permanently' },
        Found: { code: 302, text: 'Found' },
        SeeOther: { code: 303, text: 'See Other' },
        NotModified: { code: 304, text: 'Not Modified' },
        UseProxy: { code: 305, text: 'Use Proxy' },
        SwitchProxy: { code: 306, text: 'Switch Proxy' },
        TemporaryRedirect: { code: 307, text: 'Temporary Redirect' },
        PermanentRedirect: { code: 308, text: 'Permanent Redirect' },
    },
    ClientError: {
        BadRequest: { code: 400, text: 'Bad Request' },
        Unauthorized: { code: 401, text: 'Unauthorized' },
        PaymentRequired: { code: 402, text: 'Payment Required' },
        Forbidden: { code: 403, text: 'Forbidden' },
        NotFound: { code: 404, text: 'Not Found' },
        MethodNotAllowed: { code: 405, text: 'Method Not Allowed' },
        NotAcceptable: { code: 406, text: 'Not Acceptable' },
        ProxyAuthenticationRequired: { code: 407, text: 'Proxy Authentication Required' },
        RequestTimeout: { code: 408, text: 'Request Timeout' },
        Conflict: { code: 409, text: 'Conflict' },
        Gone: { code: 410, text: 'Gone' },
        LengthRequired: { code: 411, text: 'Length Required' },
        PreconditionFailed: { code: 412, text: 'Precondition Failed' },
        PayloadTooLarge: { code: 413, text: 'Payload Too Large' },
        URITooLong: { code: 414, text: 'URI Too Long' },
        UnsupportedMediaType: { code: 415, text: 'Unsupported Media Type' },
        RangeNotSatisfiable: { code: 416, text: 'Range Not Satisfiable' },
        ExpectationFailed: { code: 417, text: 'Expectation Failed' },
        ImATeapot: { code: 418, text: "I'm a teapot" },
        MisdirectedRequest: { code: 421, text: 'Misdirected Request' },
        UnprocessableEntity: { code: 422, text: 'Unprocessable Entity' },
        Locked: { code: 423, text: 'Locked' },
        FailedDependency: { code: 424, text: 'Failed Dependency' },
        UpgradeRequired: { code: 426, text: 'Upgrade Required' },
        PreconditionRequired: { code: 428, text: 'Precondition Required' },
        TooManyRequests: { code: 429, text: 'Too Many Requests' },
        RequestHeaderFieldsTooLarge: { code: 431, text: 'Request Header Fields Too Large' },
        UnavailableForLegalReasons: { code: 451, text: 'Unavailable For Legal Reasons' },
    },
    ServerError: {
        InternalServerError: { code: 500, text: 'Internal Server Error' },
        NotImplemented: { code: 501, text: 'Not Implemented' },
        BadGateway: { code: 502, text: 'Bad Gateway' },
        ServiceUnavailable: { code: 503, text: 'Service Unavailable' },
        GatewayTimeout: { code: 504, text: 'Gateway Timeout' },
        HTTPVersionNotSupported: { code: 505, text: 'HTTP Version Not Supported' },
        VariantAlsoNegotiates: { code: 506, text: 'Variant Also Negotiates' },
        InsufficientStorage: { code: 507, text: 'Insufficient Storage' },
        LoopDetected: { code: 508, text: 'Loop Detected' },
        NotExtended: { code: 510, text: 'Not Extended' },
        NetworkAuthenticationRequired: { code: 511, text: 'Network Authentication Required' },
    },
};

abstract class ExtendedError extends Error {
    type: string;

    constructor(type: string, message?: string) {
        super(message);
        this.name = this.constructor.name;
        this.type = type;
    }
}

class BadRequestError extends ExtendedError {}

class UnauthorizedError extends ExtendedError {}

class ForbiddenError extends ExtendedError {}

class NotFoundError extends ExtendedError {}

class MethodNotAllowedError extends ExtendedError {}

class RequestTimeoutError extends ExtendedError {}

class PreconditionFailedError extends ExtendedError {}

class PayloadTooLargeError extends ExtendedError {}

class URITooLongError extends ExtendedError {}

class UnsupportedMediaTypeError extends ExtendedError {}

class ImATeapotError extends ExtendedError {}

class TooManyRequestsError extends ExtendedError {}

class RequestHeaderFieldsTooLargeError extends ExtendedError {}

class UnavailableForLegalReasonsError extends ExtendedError {}

class InternalServerErrorError extends ExtendedError {}

class NotImplementedError extends ExtendedError {}

class BadGatewayError extends ExtendedError {}

class ServiceUnavailableError extends ExtendedError {}

class HTTPVersionNotSupportedError extends ExtendedError {}

/**
 * This Class Introduces us to the AppControllerError.
 * This is only used when an instantiated Controller request to the database returns an error.
 * @class
 */
class AppControllerError extends ExtendedError {}

function processResponse(errorClass: ExtendedError): {
    status: number;
    text: string;
    error?: StringObjectType;
    payload?: StringObjectType;
} {
    const { message, type, name } = errorClass;

    const errorSpecificName = name.split('Error')[0] || 'InternalServerError';
    const { code, text } = HTTPResponseTypes[type || 'ServerError'][errorSpecificName];

    const payload = message ? message : text;

    if (type === Constants.HTTPResponse.ClientError || Constants.HTTPResponse.ServerError) {
        return {
            status: code,
            text,
            error: payload,
        };
    } else {
        return {
            status: code,
            text,
            payload,
        };
    }
}

function handleError() {}
function handleSuccess() {}

export default processResponse;
export {
    /** Base error class */
    ExtendedError,
    /** App HTTP custom errors */
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    MethodNotAllowedError,
    RequestTimeoutError,
    PreconditionFailedError,
    PayloadTooLargeError,
    URITooLongError,
    UnsupportedMediaTypeError,
    ImATeapotError,
    TooManyRequestsError,
    RequestHeaderFieldsTooLargeError,
    UnavailableForLegalReasonsError,
    InternalServerErrorError,
    NotImplementedError,
    BadGatewayError,
    ServiceUnavailableError,
    HTTPVersionNotSupportedError,
    /** App database error */
    AppControllerError,
};
