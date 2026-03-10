import express from "express";
import { fetchServices } from "../modules/clients/controllers/servicesControllers";



const router = express.Router();

router.get("/services", fetchServices);
 export default router;
