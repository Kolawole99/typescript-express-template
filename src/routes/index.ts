import { Router, Request, Response, NextFunction } from 'express';

import SampleRouter from './sample';

const AppRoutes = Router();

AppRoutes.get('/', (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({ payload: 'Application is live and healthy', error: null });
});
AppRoutes.use('/sample', SampleRouter);

export default AppRoutes;
