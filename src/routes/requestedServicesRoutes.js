

import express from "express"
import { clientRequestedServices, requestedServices  } from "../modules/clients/controllers/requestedServicesController.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import requestedServicesSchema from "../validations/RequestedServicesValidation.js";
import { verifyAccessToken } from "../middlewares/authMiddlewares.js";
import { isServiceExist } from "../middlewares/requestedServicesMiddleware.js";
import { providerRequestedServices, trackRequestServiceStatus } from "../modules/providers/controllers/requestedServicesController.js";

const router = express.Router();

 router.post(
  "/",routeBodyValidation(requestedServicesSchema),verifyAccessToken(["client"]),isServiceExist,requestedServices 
     
);
router.get(
  "/client-get-requested-services/:status",verifyAccessToken(["client","provider"]),clientRequestedServices
     
);

router.get(
  "/provider-get-requested-services/:status",verifyAccessToken(["client","provider"]),providerRequestedServices
     
);

router.put("/:id",verifyAccessToken(["provider"]),trackRequestServiceStatus)



export default router;
