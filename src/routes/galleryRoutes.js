
import express from "express";
import { postGallery } from "../modules/providers/controllers/postGalleryController.js";
import { getGallery } from "../modules/clients/controllers/getGalleryController.js";
import { uploadService } from "../services/uploadService.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import gallerySchema from "../validations/galleryValidation.js";
import multiparty from "connect-multiparty";


const multipart = multiparty();


const router = express.Router();
router.post("/upload",multipart,uploadService,routeBodyValidation(gallerySchema),postGallery)
router.get("/galleries",getGallery)
export default router;