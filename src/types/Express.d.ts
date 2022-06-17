export {};

type responseBody = string | object;

declare global {
    namespace Express {
        interface Request {
            payload: {
                status: number;
                payload: responseBody;
            };
            error: {
                status: number;
                error: responseBody;
            };
        }
    }
}
