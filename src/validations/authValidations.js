
/** @format */

import Joi from 'joi';

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'string.base': 'Email should be a text field',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string()
    .required()
    .min(8)
    .max(10)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .messages({
      'string.base': 'Password should be a text field',  
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must have at least 8 characters',
      'string.max': 'Password cannot exceed 10 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character', // KOSORA HANO
      'any.required': 'Password is required',
    }),
});

export const signupSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .messages({
      'string.base': 'First name must be text',
      'string.empty': 'First name cannot be empty',
      'any.required': 'First name is required'
    }),
  lastName: Joi.string()
    .required()
    .messages({
      'string.base': 'Last name must be text',
      'string.empty': 'Last name cannot be empty',
      'any.required': 'Last name is required'
    }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'string.base': 'Email should be a text field',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .messages({
      'string.base': 'Password should be a text field',  
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must have at least 8 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character', // KOSORA HANO
      'any.required': 'Password is required',
    }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'any.only': 'Confirm password must match your password', // KOSORA HANO
      'any.required': 'Confirm password is required'
    })
});

export const categorySchema = Joi.object({
  categoryName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "Category name must be text",
      "string.empty": "Category name cannot be empty",
      "string.min": "Category name must have at least 2 characters",
      "string.max": "Category name must not exceed 50 characters",
      "any.required": "Category name is required"
    })
});

export const contactUsSchema = Joi.object({
  fullName: Joi.string()
    .required()
    .messages({
      'string.base': 'Full name must be text',
      'string.empty': 'Full name cannot be empty',
      'any.required': 'Full name is required'
    }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'string.base': 'Email should be a text field',
    'string.empty': 'Email cannot be empty',
  }),
  subject: Joi.string()
    .required()
    .messages({
      'string.empty': 'Subject cannot be empty',
      'any.required': 'Subject is required'
    }),
  message: Joi.string()
    .required()
    .messages({
      'string.empty': 'Message cannot be empty',
      'any.required': 'Message is required'
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
      'string.pattern.base': 'Password must contain uppercase, lowercase, number, and a special character', 
      'any.required': 'New password is required',
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Confirm password must match the new password',
      'any.required': 'Confirmation is required',
    }),
});