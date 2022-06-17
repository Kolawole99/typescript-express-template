export {};

type responseBody = string | object;

declare global {
    namespace Express {
        interface Request {
            payload: {
                status: number;
                error?: responseBody;
                payload?: responseBody;
            };
        }
    }
}
