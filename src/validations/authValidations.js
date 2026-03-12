/** @format */

import Joi from 'joi';

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'email is required',
    'string.email': 'email must be a valid email',
    'string.base': 'email should be a type of string',
    'string.empty': 'email is not allowed to be empty field',
  }),
  password: Joi.string()
    .required()
    .min(8)
    .max(10)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .messages({
      'string.base': 'password should be a type of text',  
      'string.empty': 'password can not be empty',
      'string.min': 'password should have minimum length of 8',
      'string.max':'password is less than or equal to ten character',
      'string.pattern':
        'password must contain atleast one uppercase letter,one lowercase letter one number, one special character',
      'any.required': 'password is required',
    }),
});

export const signupSchema = Joi.object({
    firstName:Joi.string()
    .required()
    .messages({
        'string.base':'firstName must be string',
        'string.empty':'firstName can not be empty',
        'any.required':'firstName is required'
    }),
    lastName:Joi.string()
    .required()
    .messages({
        'string.base':'lastName must be string',
        'string.empty':'lastName can not be empty',
        'any.required':'lastName is required'
    }),
    email: Joi.string().email().required().messages({
    'any.required': 'email is required',
    'string.email': 'email must be a valid email',
    'string.base': 'email should be a type of string',
    'string.empty': 'email is not allowed to be empty field',
  }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .messages({
      'string.base': 'password should be a type of text',  
      'string.empty': 'password can not be empty',
      'string.min': 'password should have minimum length of 8',
      'string.pattern':
        'password must contain atleast one uppercase letter,one lowercase letter one number, one special character',
      'any.required': 'password is required',
    }),
    confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'string.base':'Please match your password and confirm password'
    })
    
})


export const categorySchema = Joi.object({
  categoryName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "categoryName must be a string",
      "string.empty": "categoryName cannot be empty",
      "string.min": "categoryName must have at least 2 characters",
      "string.max": "categoryName must not exceed 50 characters",
      "any.required": "categoryName is required"
    })
});
export const contactUsSchema = Joi.object({

   fullName:Joi.string()
    .required()
    .messages({
        'string.base':'fullName must be string',
        'string.empty':'fullName can not be empty',
        'any.required':'fullName is required'
    }),
    
    email: Joi.string().email().required().messages({
    'any.required': 'email is required',
    'string.email': 'email must be a valid email',
    'string.base': 'email should be a type of string',
    'string.empty': 'email is not allowed to be empty field',
  }),

  subject:Joi.string()
    .required()
    .messages({
        'string.empty':'subject can not be empty',
       
    }),
    message:Joi.string()
    .required()
    .messages({
        'string.empty':'subject can not be empty',
       
    }),
});

export const changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .messages({
      'string.empty': 'New password is required',
      'string.min': 'New password must be at least 8 characters',
      'string.pattern': 'Password must contain uppercase, lowercase, number, and a special character',
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Confirm password must match the new password',
      'any.required': 'Confirmation is required',
    }),
});


