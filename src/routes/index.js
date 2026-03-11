/** @format */

import express from 'express';
import authRouter from './authRoutes.js';
import categoryRoutes from "./categoryRoutes.js";
import cantactRoutes from "./contactRoutes.js"
import serviceRoutes from "./serviceRoutes.js"
import requestedServicesRoutes from "./requestedServicesRoutes.js"


const router = express.Router();

router.use('/auth', authRouter); 
router.use("/categories", categoryRoutes); 
router.use("/contact",cantactRoutes),
router.use("/services",serviceRoutes)
router.use("/request-service",requestedServicesRoutes )



export default router;