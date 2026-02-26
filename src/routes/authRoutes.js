
import express from "express"
import {  login, signUpProvider, singUpClient, verifyAccount } from "../modules/auth/authControllers.js"
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js"
import { signupSchema } from "../validations/authValidations.js"
import { isAccountExist } from "../middlewares/authMiddlewares.js"

const router = express.Router()
router.post("/provider-signup",routeBodyValidation(signupSchema),isAccountExist,signUpProvider)
router.post("/client-signup",routeBodyValidation(signupSchema),isAccountExist,singUpClient)
router.post("/verify-account", verifyAccount);
router.post("/login",login)
export default router