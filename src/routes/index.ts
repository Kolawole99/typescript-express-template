import { Router } from 'express';

const router = Router();

router
    .post('/')
    .get('/')
    .get('/:id')
    .put('/:id')
    .patch('/:id')
    .delete('/:id');

export default router;