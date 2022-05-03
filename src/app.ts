import express, {Request, Response, NextFunction} from 'express';

import appRoutes from './routes/index';

const app = express();

app.use('/', appRoutes);
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(500).json({payload: null, message: error.message})
})

app.listen(3000);

