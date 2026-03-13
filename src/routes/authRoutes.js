import express from "express";
import {
  forgotPassword,
  login,
  Logout,
  signUpProvider,
  singUpClient,
  verifyAccount,getprofile,
  updateProfile,
  updatePassword
} from "../modules/auth/authControllers.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import { signupSchema, changePasswordSchema } from "../validations/authValidations.js";
import { checkUser, isAccountFind, isAccountVerified, isPasswordMatch, isTokenExist,verifyAccessToken } from "../middlewares/authMiddlewares.js";
import { deleteAccount } from "../modules/shared/controllers/deleteAccount.js";

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
router.get("/profile", verifyAccessToken(["client","provider"]), getprofile);
router.patch("/edit-profile",verifyAccessToken(["client","provider"]), updateProfile);
router.delete("/delete-account", verifyAccessToken(["client","provider"]), deleteAccount);
router.patch(
  "/change-password", 
  verifyAccessToken(["client", "provider"]), 
  routeBodyValidation(changePasswordSchema), 
  updatePassword
);


export default router;

// Tuyikunde@65
