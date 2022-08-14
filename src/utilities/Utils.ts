/** This parses an object to human readable format */
function parseObject(params: object) {
    return JSON.parse(JSON.stringify(params));
}

/** This method ensures that the string is valid */
function verifyString(message: string) {
    if (message) {
        return true;
    }

    return false;
}

/** This method ensures that the parameter is a valid object */
function verifyObject(body: object) {
    if (
        body && // Verify body presence
        Object.keys(body).length === 0 && // Verify body object type content
        Object.getPrototypeOf(body) === Object.prototype // Verify object type
    ) {
        return true;
    }

    return false;
}

export { parseObject, verifyString, verifyObject };
