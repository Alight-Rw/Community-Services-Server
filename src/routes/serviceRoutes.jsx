import express from "express"
import { validateService } from "../middlewares/serviceMiddlewares"
import { createService } from "../modules/providers/controllers/servicesControllers"
import { uploadService } from "../services/uploadService"


const router=express.Router()

router.post("/create-service",uploadService,validateService,createService)


export default router