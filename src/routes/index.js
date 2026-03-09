/** @format */

import express from 'express';
import authRouter from './authRoutes.js';
import categoryRoutes from "./categoryRoutes.js";
import cantactRoutes from "./contactRoutes.js"
import serviceRoutes from "./serviceRoutes.js"
import { fetchaAllServices } from '../modules/clients/controllers/allServicesControllers.js';

const router = express.Router();

router.use('/auth', authRouter); 
router.use("/categories", categoryRoutes); 
router.use("/contact",cantactRoutes),
router.use("/services",serviceRoutes)
router.use("/allservices",fetchaAllServices)



export default router;