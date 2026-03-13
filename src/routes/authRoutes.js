import express from "express";
import multiparty from "connect-multiparty";
import {
  forgotPassword,
  login,
  Logout,
  signUpProvider,
  singUpClient,
  verifyAccount,getprofile,
  updatePassword,
  updateProfile
} from "../modules/auth/authControllers.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import { signupSchema } from "../validations/authValidations.js";
import { checkUser, isAccountFind, isAccountVerified, isPasswordMatch, isTokenExist,verifyAccessToken } from "../middlewares/authMiddlewares.js";
import { uploadService } from "../services/uploadService.js";

const multipart = multiparty()
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
router.post("/logout", verifyAccessToken(["client","provider"]), Logout);
router.patch("/edit-profile", multipart, verifyAccessToken(["client", "provider"]), uploadService, updateProfile);
router.get("/profile", verifyAccessToken(["client","provider"]), getprofile);
router.patch( "/change-password", verifyAccessToken(["client", "provider"]), updatePassword );


export default router;

// Tuyikunde@65
