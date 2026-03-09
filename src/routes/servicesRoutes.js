import express from "express";

import { fetchaAllServices } from "../modules/clients/controllers/allServicesControllers.js";

const router = express.Router();

router.get("/allservices", fetchaAllServices);
 export default router;
