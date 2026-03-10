

import express from "express"
import { requestService  } from "../modules/clients/controllers/requestedController.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import requestedSchema from "../validations/RequestedServicesValidation.js";
import { verifyUserToken } from "../middlewares/authMiddlewares.js";
import { isServiceExist } from "../middlewares/requestedMiddleware.js";

const router = express.Router();

 router.post(
  "/create",routeBodyValidation(requestedSchema),verifyUserToken,isServiceExist,requestService 
     
);

export default router;
