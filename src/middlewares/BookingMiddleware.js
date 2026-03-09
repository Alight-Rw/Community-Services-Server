import { StatusCodes } from "http-status-codes"
import { handleError } from "../utils/responseUtils.js"
import { FindById } from "../modules/clients/repositories/BookingRespositories.js"
import mongoose from "mongoose"



const BookingServiceMiddleware = async (req, res, next) => {

    const { serviceId } = req.params

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        return handleError(res, StatusCodes.BAD_REQUEST, "Invalid serviceId");
         }

    const service = await FindById(serviceId)
    if (!service) {
        return handleError(res, StatusCodes.NOT_FOUND, "Service are not found")
    }
    next()

}

export {
    BookingServiceMiddleware
}