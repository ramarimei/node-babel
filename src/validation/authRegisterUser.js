import Joi from 'joi';

const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required()
        .error(new Error('Invalid username must be between 3 and 50 characters')),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,64}$'))
        .required()
        .error(new Error('Invalid password')),

    email: Joi.string()
        .email({ minDomainSegments: 2})
        .required()
        .error(new Error('Invalid email')),
});

export default registerSchema;  
    