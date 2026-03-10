import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";
import { getServices } from "../../providers/repositories/profileRepositories.js";

export const fetchServices = async (req, res) => {
  try {

    const services = await getServices();

    return handleSuccess(res, StatusCodes.OK, "Services fetched", services);

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};