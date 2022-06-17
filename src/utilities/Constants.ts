export default {
    AllowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    HTTPResponse: {
        Informational: 'Informational',
        Success: 'Success',
        Redirect: 'Redirect',
        ClientError: 'ClientError',
        ServerError: 'ServerError',
    },
    RequestMaxByteSize: 5242880, // This is representing (5MB/5,120KB) of data in bytes
};
