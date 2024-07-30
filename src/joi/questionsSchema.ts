import Joi from 'joi';

export const getManySchema = Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().required()
});

export const postSearchSchema = Joi.object({
    searches: Joi.number().required(),
    term: Joi.string().required(),
    image: Joi.optional(),
});

export const deleteSearchSchema = Joi.object({
    id: Joi.number().required(),
});

export const getOneSchema = Joi.object({
    id: Joi.number().required(),
});