/** @format */

import express from 'express';
import authRouter from './authRoutes.js';
import categoryRoutes from "./categoryRoutes.js";
import cantactRoutes from "./contactRoutes.js"

const router = express.Router();

router.use('/auth', authRouter); 
router.use("/categories", categoryRoutes); 
router.use("/contact",cantactRoutes)



export default router;