

import express from "express";
import {
  forgotPassword,
  login,
  signUpProvider,
  singUpClient,
} from "../modules/auth/authControllers.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import { signupSchema } from "../validations/authValidations.js";

import { checkUser, isAccountFind, isAccountVerified, isPasswordMatch } from "../middlewares/authMiddlewares.js";

const router = express.Router();
router.post(
  "/provider-signup",
  routeBodyValidation(signupSchema),
  checkUser("isConflict"),
  signUpProvider,
);
router.post(
  "/client-signup",
  routeBodyValidation(signupSchema),
  checkUser("isConflict"),
  singUpClient,
);
router.post("/forgot-password",
   checkUser("notUser"),forgotPassword
  );


router.post("/login",isAccountFind,isPasswordMatch,isAccountVerified, login);
export default router;
