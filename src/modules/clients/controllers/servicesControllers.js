import { StatusCodes } from "http-status-codes";
import { searchService, listServices } from "../repositories/servicesRepositories.js";
import { handleSuccess,handleError } from "../../../utils/responseUtils.js";


const searchServices = async (req, res) => {
  try {
    const query = String(req.query.search || "").trim();

    if (!query) {
      return handleError(
        res,
        StatusCodes.BAD_REQUEST,
        "Search query is required"
      );
    }

    const services = await searchService(query);

    if (services.length === 0) {
      return handleError(
        res,
        StatusCodes.NOT_FOUND,
        "Service not found"
      );
    }

    return handleSuccess(
      res,
      StatusCodes.OK,
      "Service found successfully",
      services
    );
  } catch (error) {
    return handleError(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

 const allServices = async (req, res) => {
  try {
    const services = await listServices(req.query);
   
    return handleSuccess(res, StatusCodes.OK, "Services fetched", services);

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export {searchServices,allServices}

