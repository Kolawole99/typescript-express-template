/**
 * This handles all the required Express router configuration for the application.
 * @module ROUTES
 */
import { Express } from '../utilities/PackageWrapper';
import {
    verifyHTTPVersion,
    verifyRequestMethod,
    setupRequest,
    processRequestSuccessResponse,
    process404,
    processRequestErrorResponse,
} from '../middlewares/HTTP';
import SampleRouter from './Sample';

const ApplicationRoutes = Express.Router({ strict: true, caseSensitive: true });

/** Cross Origin Handling */
ApplicationRoutes.use(verifyHTTPVersion);
ApplicationRoutes.use(verifyRequestMethod);
ApplicationRoutes.use(setupRequest);
ApplicationRoutes.get('/', (request, _response, next) => {
    request.payload = {
        payload: 'Application is running and healthy',
        status: 200,
        text: 'Success',
    };
    next();
});
ApplicationRoutes.use('/sample', SampleRouter);
ApplicationRoutes.use(processRequestSuccessResponse);
ApplicationRoutes.use(process404);
ApplicationRoutes.use(processRequestErrorResponse);

export default ApplicationRoutes;
