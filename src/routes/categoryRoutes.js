import express from "express";
import { categoryExist } from "../middlewares/categoryMiddlewares.js";
import { createCategoryies,getCategories } from "../modules/shared/controllers/categoryController.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import { categorySchema } from "../validations/authValidations.js";



const router = express.Router();


router.get("/categories", getCategories);
router.post("/",routeBodyValidation(categorySchema),categoryExist, createCategoryies);

export default router;