import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../modules/clients/controllers/categoryController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js"; 

const router = express.Router();


router.get("/", getCategories);
router.post("/", protect, authorize("admin", "provider"), createCategory);
router.put("/:id", protect, authorize("admin", "provider"), updateCategory);
router.delete("/:id", protect, authorize("admin", "provider"), deleteCategory);

export default router;