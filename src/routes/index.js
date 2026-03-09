/** @format */

import express from 'express';
import authRouter from './authRoutes.js';
import categoryRoutes from "./categoryRoutes.js";
import cantactRoutes from "./contactRoutes.js"
import serviceRoutes from "./serviceRoutes.js"
import BookingRoutes from "./BookingRoutes.js"


const router = express.Router();

router.use('/auth', authRouter); 
router.use("/categories", categoryRoutes); 
router.use("/contact",cantactRoutes),
router.use("/services",serviceRoutes)
router.use("/booking",BookingRoutes )



export default router;