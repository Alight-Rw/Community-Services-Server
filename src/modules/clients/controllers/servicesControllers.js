
import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";
import { getServices } from "../repositories/servicesRepositories.js";

export const fetchServices = async (req, res) => {
    try {

        const Services = await getServices()

        return handleSuccess(res, StatusCodes.CREATED, "Services created successfully", Services)
    } catch (error) {
        return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message)
    }
}