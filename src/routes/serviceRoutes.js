import express from "express"
import { uploadService } from "../services/uploadService.js"
import { createServices, getAllAvailableServices, getLatestThreeServicesPosted } from "../modules/providers/controllers/servicesControllers.js"
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js"
import serviceSchema from "../validations/serviceValidation.js"
import { verifyUserToken } from "../middlewares/authMiddlewares.js"
import { checkServiceExistence, checkServicesToShow } from "../middlewares/serviceMiddlewares.js"




const router=express.Router()
router.post("/create",uploadService,routeBodyValidation(serviceSchema),verifyUserToken,checkServiceExistence,createServices)
router.get("/get-Lastest-threes-Services",checkServicesToShow,getLatestThreeServicesPosted)
router.get("/",getAllAvailableServices)



export default router