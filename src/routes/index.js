/** @format */

import express from 'express';
import authRouter from './authRoutes.js';
import categoryRoutes from "./categoryRoutes.js";
import cantactRoutes from "./contactRoutes.js"
import serviceRoutes from "./serviceRoutes.js"
import requestedServicesRoutes from "./requestedServicesRoutes.js"
import galleryRoutes from "./galleryRoutes.js"


const router = express.Router();

router.use('/auth', authRouter); 
router.use("/category", categoryRoutes); 
router.use("/contact",cantactRoutes),
router.use("/service",serviceRoutes)
router.use("/request-service",requestedServicesRoutes )
router.use("/gallery", galleryRoutes )


export default router;