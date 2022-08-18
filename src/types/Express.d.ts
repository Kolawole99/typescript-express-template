export {};

declare global {
    namespace Express {
        interface Request {
            payload: {
                status: number;
                text: string;
                error?: StringObjectType;
                payload?: StringObjectType;
            };
        }
    }
}
