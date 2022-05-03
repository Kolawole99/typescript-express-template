import { Router, Request, Response, NextFunction } from 'express';

const SampleRouter = Router();

try {
    SampleRouter.post('/', (request: Request, response: Response, next: NextFunction) => {
        response.status(500).json({ payload: null });
    })
        .get('/', (request: Request, response: Response, next: NextFunction) => {
            response.status(500).json({ payload: null });
        })
        .get('/:id')
        .put('/:id')
        .patch('/:id')
        .delete('/:id');
} catch (error) {
    console.log(error);
}

export default SampleRouter;
