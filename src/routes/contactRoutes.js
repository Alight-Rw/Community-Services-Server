import express from "express";
import {
  ContactUsMessage,
} from "../modules/auth/authControllers.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import { contactUsSchema } from "../validations/authValidations.js";


const router = express.Router();

 router.post(
  "/message",
    routeBodyValidation(contactUsSchema),ContactUsMessage      
);

export default router;
