const Joi = require('joi');

exports.registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),

    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/)
        .trim()
        .required(),
    confirmPassword: Joi.string().valid(Joi.ref('password'))
        .trim()
        .required()
        .strip(),
    email: Joi.string()
        .trim()
        .email({
            tlds: { allow: ['com', 'net'] }
        }),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
})

exports.loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email({
            tlds: { allow: ['com', 'net'] }
        }),
    password: Joi.string().required()
});

