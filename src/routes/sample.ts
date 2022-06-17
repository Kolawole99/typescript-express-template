import { Router, Request, Response, NextFunction } from 'express';

const SampleRouting = Router();

try {
    SampleRouting.post('/', async (request: Request, response: Response, next: NextFunction) => {
        // request.payload = await sampleService.createRecord({ request, next });
        request.payload = { status: 200, payload: 'Post response' };
        next();
    })
        .get('/', async (request: Request, response: Response, next: NextFunction) => {
            // request.payload = await sampleService.createRecord({ request, next });
            request.payload = { status: 200, payload: 'Get response' };
            next();
        })
        .get('/:id', async (request: Request, response: Response, next: NextFunction) => {
            // request.payload = await sampleService.createRecord({ request, next });
            request.payload = { status: 500, payload: 'Get by Id response' };
            next();
        })
        .put('/:id', async (request: Request, response: Response, next: NextFunction) => {
            // request.payload = await sampleService.createRecord({ request, next });
            request.payload = { status: 201, payload: 'Put response' };
            next();
        })
        .patch('/:id', async (request: Request, response: Response, next: NextFunction) => {
            // request.payload = await sampleService.createRecord({ request, next });
            request.payload = { status: 404, payload: 'Patch by id response' };
            next();
        })
        .delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
            // request.payload = await sampleService.createRecord({ request, next });
            request.payload = { status: 200, payload: 'Delete response' };
            next();
        });
} catch (error) {
    console.log(error);
    // Replace with logging service like splunk etc.
}

export default SampleRouting;
