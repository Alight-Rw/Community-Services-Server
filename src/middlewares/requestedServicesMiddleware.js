import { StatusCodes } from "http-status-codes"
import { handleError } from "../utils/responseUtils.js"
import mongoose from "mongoose"
import { FindRequestedServicesInfo } from "../modules/clients/repositories/servicesRepositories.js"



const isServiceExist = async (req, res, next) => {

    const { serviceId } = req.body

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        return handleError(res, StatusCodes.BAD_REQUEST, "Invalid serviceId");
         }

    const service = await FindRequestedServicesInfo(serviceId)
    if (!service) {
        return handleError(res, StatusCodes.NOT_FOUND, "Service are not found")
    }
    next()

}

export {
    isServiceExist
}