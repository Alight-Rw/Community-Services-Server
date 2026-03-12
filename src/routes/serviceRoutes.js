import express from "express"
import { uploadService } from "../services/uploadService.js"
import { createServices, getAllAvailableServices,latestServices, updateService} from "../modules/providers/controllers/servicesControllers.js"
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js"
import serviceSchema from "../validations/serviceValidation.js"
import { verifyUserToken } from "../middlewares/authMiddlewares.js"
import { checkServiceExistence, isServiceOwner, isServicesFound  } from "../middlewares/serviceMiddlewares.js"




const router=express.Router()
router.post("/create",uploadService,routeBodyValidation(serviceSchema),verifyUserToken,checkServiceExistence,createServices)
router.get("/latest-services",isServicesFound ,latestServices)
router.get("/available-services",isServicesFound,getAllAvailableServices)
router.put("/:id",verifyUserToken,uploadService,isServicesFound,isServiceOwner,updateService)



export default router