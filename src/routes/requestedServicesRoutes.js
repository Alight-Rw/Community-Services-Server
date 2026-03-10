

import express from "express"
import { requestedServices  } from "../modules/clients/controllers/requestedServicesController.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import requestedServicesSchema from "../validations/RequestedServicesValidation.js";
import { verifyUserToken } from "../middlewares/authMiddlewares.js";
import { isServiceExist } from "../middlewares/requestedServicesMiddleware.js";

const router = express.Router();

 router.post(
  "/create",routeBodyValidation(requestedServicesSchema),verifyUserToken,isServiceExist,requestedServices 
     
);

export default router;
