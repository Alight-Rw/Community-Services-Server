import express from "express";
import {
  forgotPassword,
  login,
  signUpProvider,
  singUpClient,
} from "../modules/auth/authControllers.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import { signupSchema } from "../validations/authValidations.js";
import { isAccountExist, isfindUser } from "../middlewares/authMiddlewares.js";

const router = express.Router();
router.post(
  "/provider-signup",
  routeBodyValidation(signupSchema),
  isAccountExist,
  signUpProvider,
);
router.post(
  "/signup",
  routeBodyValidation(signupSchema),
  isAccountExist,
  singUpClient,
);
router.post("/forgot-password",
   isfindUser,forgotPassword
  );


router.post("/login", login);
export default router;
