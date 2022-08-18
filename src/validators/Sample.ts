/**
 * Handles the implementation of Joi package for Sample model and service validation
 * @module VALIDATOR:Sample
 */
import { Joi } from '../utilities/PackageWrapper';

const createSchema = Joi.object({
    title: Joi.string().min(4).required().label('Title'),
});

const updateSchema = Joi.object({
    title: Joi.string().min(4).required().label('Title'),
});

export { createSchema, updateSchema };
