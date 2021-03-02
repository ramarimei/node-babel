import Joi from 'joi';

const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,64}$'))
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2})
        .required()
});

export default registerSchema;  
    