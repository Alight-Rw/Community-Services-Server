

import express from "express"
import { clientRequestedServices, requestedServices  } from "../modules/clients/controllers/requestedServicesController.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import requestedServicesSchema from "../validations/RequestedServicesValidation.js";
import { verifyAccessToken } from "../middlewares/authMiddlewares.js";
import { isServiceExist } from "../middlewares/requestedServicesMiddleware.js";
import { providerRequestedServices } from "../modules/providers/controllers/requestedServicesController.js";

const router = express.Router();

 router.post(
  "/",routeBodyValidation(requestedServicesSchema),verifyAccessToken(["client"]),isServiceExist,requestedServices 
     
);
router.get(
  "/client-get-requested-services/:status",verifyAccessToken(["client"]),clientRequestedServices
     
);

router.get(
  "/provider-get-requested-services/:status",verifyAccessToken(["provider"]),providerRequestedServices
     
);



export default router;
