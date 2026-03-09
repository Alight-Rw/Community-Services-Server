import Joi from "joi";

const serviceSchema = Joi.object({
  avatar: Joi.string().required().messages({
    "any.required": "avatar is required",
    "string.base": "avatar must be a string",
    "string.empty": "avatar must not be empty"
  }),

  name: Joi.string().required().messages({
    "any.required": "name is required",
    "string.base": "name must be a string",
    "string.empty": "name must not be empty"
  }),

  category: Joi.string().required().messages({
    "any.required": "category is required",
    "string.base": "category must be a string",
    "string.empty": "category must not be empty"
  }),

  description: Joi.string().required().messages({
    "any.required": "description is required",
    "string.base": "description must be a string",
    "string.empty": "description must not be empty"
  }),

  price: Joi.number().required().messages({
    "any.required": "price is required",
    "number.base": "price must be a number"
  }),

  location: Joi.string().required().messages({
    "any.required": "location is required",
    "string.base": "location must be a string",
    "string.empty": "location must not be empty"
  }),


  timeFrom: Joi.string().required().messages({
    "any.required": "timeFrom is required",
    "string.base": "timeFrom must be a string",
    "string.empty": "timeFrom must not be empty"
  }),

  timeTo: Joi.string().required().messages({
    "any.required": "timeTo is required",
    "string.base": "timeTo must be a string",
    "string.empty": "timeTo must not be empty"
  })
});

export default serviceSchema;
