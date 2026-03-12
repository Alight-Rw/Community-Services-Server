
import Joi from "joi";

const gallerySchema = Joi.object({
  avatar: Joi.string().required().messages({
    "any.required": "avatar is required",
    "string.base": "avatar must be a string",
    "string.empty": "avatar must not be empty"
  }),

  title: Joi.string().required().messages({
    "any.required": "title is required",
    "string.base": "title must be a string",
    "string.empty": "title must not be empty"
  }),

  
  description: Joi.string().required().messages({
    "any.required": "description is required",
    "string.base": "description must be a string",
    "string.empty": "description must not be empty"
  })

  
});

export default gallerySchema;
