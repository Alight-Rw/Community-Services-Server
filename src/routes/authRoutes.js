
import express from "express";
import {
  forgotPassword,
  login,
  Logout,
  signUpProvider,
  singUpClient,
  verifyAccount, getprofile,
  updateProfile,
} from "../modules/auth/authControllers.js";

import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import { signupSchema } from "../validations/authValidations.js";

import {
  checkUser,
  isAccountFind,
  isAccountVerified,
  isPasswordMatch,
  isTokenExist,
  isfindUser,
  verifyUserToken,
} from "../middlewares/authMiddlewares.js";


const router = express.Router();


router.post(
  "/provider-signup",
  routeBodyValidation(signupSchema),
  checkUser("isConflict"),
  signUpProvider
);

router.post(
  "/client-signup",
  routeBodyValidation(signupSchema),
  checkUser("isConflict"),
  singUpClient
);

router.post(
  "/forgot-password",
  checkUser("notUser"),
  forgotPassword
);

router.get(
  "/verify-account/:token",
  isTokenExist,
  verifyAccount
);

router.post("/login", isAccountFind, isPasswordMatch, isAccountVerified, login);
router.post("/logout", verifyUserToken, Logout);
router.get("/profile", verifyUserToken, getprofile);
forgotPassword,
  checkUser("notUser"), forgotPassword

router.patch("/update-profile", verifyUserToken, updateProfile);
router.post(
  "/login",
  isAccountFind,
  isPasswordMatch,
  isAccountVerified,
  login
);

router.post(
  "/logout",
  verifyUserToken,
  Logout
);


export default router;