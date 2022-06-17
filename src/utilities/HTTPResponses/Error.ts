/**
 * This modules handles the global classes for all application Custom Errors extending the inbuilt Error class
 * @module UTILITY:CustomErrors
 */

abstract class MyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * This Class Introduces us to the CustomValidationError.
 * This is only used when a required Validation condition in a request payload is not met.
 * @class
 */
class CustomValidationError extends MyError {}

/**
 * This Class Introduces us to the CustomControllerError.
 * This is only used when an instantiated Controller request returns an error.
 * @class
 */
class CustomControllerError extends MyError {}

export { CustomValidationError, CustomControllerError };
