/**
 * This handles all the required Express router configuration for the application.
 * @module ROUTES
 */

import { Router, Request, Response, NextFunction } from 'express';

import {
    verifyHTTPVersion,
    verifyRequestMethod,
    setupRequest,
    processRequestSuccessResponse,
    processRequestErrorResponse,
} from '../middlewares/http';
import SampleRouter from './Sample';

const ApplicationRoutes = Router({ strict: true, caseSensitive: true });

/** Cross Origin Handling */
ApplicationRoutes.use(verifyHTTPVersion);
ApplicationRoutes.use(verifyRequestMethod);
ApplicationRoutes.use(setupRequest);
ApplicationRoutes.get('/', (request: Request, response: Response, next: NextFunction) => {
    request.payload = { payload: 'Application is running and healthy', status: 200 };
    next();
});
ApplicationRoutes.use('/sample', SampleRouter);
ApplicationRoutes.use(processRequestSuccessResponse);
ApplicationRoutes.use(processRequestErrorResponse);

export default ApplicationRoutes;
