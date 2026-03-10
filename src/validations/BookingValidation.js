import Joi from "joi";

const bookingSchema = Joi.object({
  serviceId: Joi.string().required().messages({
    "any.required": "serviceId is required",
    "string.base": "serviceId must be a string",
    "string.empty": "serviceId must not be empty"
  }),

  Date: Joi.string().required().messages({
    "any.required": "Date is required",
    "number.base": "Date must be a string"
  }),

  
  time: Joi.string().required().messages({
    "any.required": "time is required",
    "string.base": "time must be a string",
    "string.empty": "time must not be empty"
  }),

  location: Joi.string().required().messages({
    "any.required": "location is required",
    "string.base": "location must be a string",
    "string.empty": "location must not be empty"
  }),

  AdittionalNotes: Joi.string().allow("").messages({
    "string.base": "AdittionalNotes must be a string"
  }),

  fullName: Joi.string().required().messages({
    "any.required": "fullName is required",
    "string.base": "fullName must be a string",
    "string.empty": "fullName must not be empty"
  }),

  email: Joi.string().email().required().messages({
    "any.required": "email is required",
    "string.email": "email must be valid",
    "string.empty": "email must not be empty"
  }),

  phone: Joi.number().required().messages({
    "any.required": "phone is required",
    "number.base": "phone must be a number"
  }),

  status: Joi.string().valid("Waiting", "Approved", "Completed", "Rejected").messages({
    "any.only": "status must be Waiting, Approved, Completed or Rejected"
  })
});

export default bookingSchema;