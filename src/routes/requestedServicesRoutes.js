

import express from "express"
import { requestedServices  } from "../modules/clients/controllers/requestedServicesController.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import requestedServicesSchema from "../validations/RequestedServicesValidation.js";
import { verifyAccessToken } from "../middlewares/authMiddlewares.js";
import { isServiceExist } from "../middlewares/requestedServicesMiddleware.js";

const router = express.Router();

 router.post(
  "/book-service",routeBodyValidation(requestedServicesSchema),verifyAccessToken(["client"]),isServiceExist,requestedServices 
     
);

export default router;
