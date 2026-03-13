
import express from "express";
import { postGallery } from "../modules/providers/controllers/postGalleryController.js";
import { getGallery } from "../modules/clients/controllers/getGalleryController.js";
import { uploadService } from "../services/uploadService.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import gallerySchema from "../validations/galleryValidation.js";



const router = express.Router();
router.post("/create",uploadService,routeBodyValidation(gallerySchema),postGallery)
router.get("/get-gallery",getGallery)
export default router;