import { Router, Request, Response, NextFunction } from 'express';

import SampleService from '../services/sample/Sample';

const SampleRouting = Router();
// const sampleService = new SampleService();

try {
    SampleRouting.post('/', async (request, _response, next) => {
        // request.payload = await sampleService.createRecord({ request, next });
        request.payload = { status: 200, payload: 'Post response' };
        next();
    })
        .get('/', async (request, _response, next) => {
            // request.payload = await sampleService.createRecord({ request, next });
            request.payload = { status: 200, payload: 'Get response' };
            next();
        })
        .get('/:id', async (request, _response, next) => {
            // request.payload = await sampleService.createRecord({ request, next });
            request.payload = { status: 500, payload: 'Get by Id response' };
            next();
        })
        .put('/:id', async (request, _response, next) => {
            // request.payload = await sampleService.createRecord({ request, next });
            request.payload = { status: 201, payload: 'Put response' };
            next();
        })
        .patch('/:id', async (request, _response, next) => {
            // request.payload = await sampleService.createRecord({ request, next });
            request.payload = { status: 404, payload: 'Patch by id response' };
            next();
        })
        .delete('/:id', async (request, _response, next) => {
            // request.payload = await sampleService.createRecord({ request, next });
            request.payload = { status: 200, payload: 'Delete response' };
            next();
        });
} catch (error) {
    console.log(error);
    // Replace with logging service like splunk etc.
}

export default SampleRouting;
