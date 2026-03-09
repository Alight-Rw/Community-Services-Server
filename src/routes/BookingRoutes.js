

import express from "express"
import { BookingService } from "../modules/clients/controllers/bookingController.js";
import { BookingServiceMiddleware } from "../middlewares/BookingMiddleware.js";
import { routeBodyValidation } from "../middlewares/requestMiddlewares.js";
import bookingSchema from "../validations/BookingValidation.js";

const router = express.Router();

 router.post(
  "/create/:serviceId",routeBodyValidation(bookingSchema),BookingServiceMiddleware,BookingService
     
);

export default router;
