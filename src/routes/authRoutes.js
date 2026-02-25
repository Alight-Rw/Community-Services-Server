import express from "express"
import { signUpProvider } from "../modules/auth/authControllers.js"
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js"
import { signupSchema } from "../validations/authValidations.js"
import { isAccountExist } from "../middlewares/authMiddlewares.js"

const router = express.Router()
router.post("/provider-signup",routeBodyValidation(signupSchema),isAccountExist,signUpProvider)
export default router