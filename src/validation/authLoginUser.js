import Joi from 'joi';

const authLoginSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required()
        .error(new Error('Invalid username must be between 3 and 50 characters')),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,64}$'))
        .required()
        .error(new Error('Invalid password - must be atleast 6 characters')),

});

export default authLoginSchema;  
    