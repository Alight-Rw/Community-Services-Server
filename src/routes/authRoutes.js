import express from "express";
import {
  forgotPassword,
  login,
  Logout,
  signUpProvider,
  singUpClient,
  verifyAccount,
} from "../modules/auth/authControllers.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import { signupSchema } from "../validations/authValidations.js";
import { verifyUserToken } from "../middlewares/authMiddlewares.js";
import { checkUser, isAccountFind, isAccountVerified, isPasswordMatch, isTokenExist } from "../middlewares/authMiddlewares.js";

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
  checkUser("notUser"), forgotPassword
);

router.get(
  "/verify-account/:token",
  isTokenExist,
  verifyAccount
);

router.post("/login", isAccountFind, isPasswordMatch, isAccountVerified, login);
router.post("/logout", verifyUserToken, Logout);


export default router;
