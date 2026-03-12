

import express from "express"
import { MyRequestedServices, requestedServices  } from "../modules/clients/controllers/requestedServicesController.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import requestedServicesSchema from "../validations/RequestedServicesValidation.js";
import { isProviderIdExist, verifyAccessToken } from "../middlewares/authMiddlewares.js";
import { isServiceExist } from "../middlewares/requestedServicesMiddleware.js";

const router = express.Router();

 router.post(
  "/book-service",routeBodyValidation(requestedServicesSchema),verifyAccessToken(["client"]),isProviderIdExist,isServiceExist,requestedServices 
     
);
router.get(
  "/get-requested-services/:status",verifyAccessToken(["client"]),MyRequestedServices
     
);

export default router;
