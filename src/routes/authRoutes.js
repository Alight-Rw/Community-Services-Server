import express from "express";
import {
  forgotPassword,
  login,
  signUpProvider,
  singUpClient,
  verifyAccount,
} from "../modules/auth/authControllers.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import { signupSchema } from "../validations/authValidations.js";
import { checkUser, isTokenExist } from "../middlewares/authMiddlewares.js";

const router = express.Router();
router.post(
  "/provider-signup",
  routeBodyValidation(signupSchema),
  checkUser("isConflict"),
  signUpProvider,
);
router.post(
  "/signup",
  routeBodyValidation(signupSchema),
  checkUser("isConflict"),
  singUpClient,
);
router.post("/forgot-password",
   checkUser("notUser"),forgotPassword
  );


router.get(
  "/verify-account/:token",
  isTokenExist,        
  verifyAccount       
);

router.post("/login", login);
export default router;
