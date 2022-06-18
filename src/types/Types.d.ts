import Express from 'express';

import BaseController from '../controllers/index';

declare global {
    type Request = Express.Request;
    type Response = Express.Response;
    type NextFunction = Express.NextFunction;

    type RequestHandler = {
        request: Request;
        response: Response;
        next: NextFunction;
    };

    type Controller = BaseController;
}
