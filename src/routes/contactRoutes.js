
import express from "express"
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import { ContactUsMessage } from "../modules/common/contactController.js";
import { contactUsSchema } from "../validations/authValidations.js";


const router = express.Router();

 router.post(
  "/message",
    routeBodyValidation(contactUsSchema),ContactUsMessage    
);

export default router;