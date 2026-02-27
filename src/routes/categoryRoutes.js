import express from "express";
import {
  createCategory,
  getCategories,
} from "../modules/shared/controllers/categoryController.js";


const router = express.Router();


router.get("/", getCategories);
router.post("/", createCategory);

export default router;