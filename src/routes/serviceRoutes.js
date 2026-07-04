import express from "express"
import { uploadService } from "../services/uploadService.js"
import { allProviderServices, createServices, deleteServices, getAllAvailableServices, getLastFourServices, updateService } from "../modules/providers/controllers/servicesControllers.js"
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js"
import serviceSchema from "../validations/serviceValidation.js"
import { verifyAccessToken } from "../middlewares/authMiddlewares.js"
import { isServiceExist, fetchService, isServiceOwner, validateDeleteService } from "../middlewares/serviceMiddlewares.js"
import { allServices, searchServices } from "../modules/clients/controllers/servicesControllers.js"
import multiparty from "connect-multiparty";



const multipart = multiparty();

const router=express.Router()
router.post("/create",multipart,uploadService,routeBodyValidation(serviceSchema),verifyAccessToken(["provider"]),isServiceExist,createServices)
router.get("/last-services",verifyAccessToken(["client","provider"]),fetchService,getLastFourServices)
router.get("/available-services",fetchService,getAllAvailableServices)
router.get("/search", searchServices);
router.get("/services",fetchService,allServices)
router.get("/provider-services",verifyAccessToken(["provider"]),fetchService,allProviderServices)
router.patch("/:id",verifyAccessToken(["provider"]),uploadService,isServiceOwner,updateService)
router.delete("/:id",verifyAccessToken(["provider"]),validateDeleteService,deleteServices)




export default router