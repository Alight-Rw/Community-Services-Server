import { StatusCodes } from "http-status-codes";
import { searchService } from "../repositories/servicesRepositories.js";
import { handleSuccess,handleError } from "../../../utils/responseUtils.js";
import { getServices } from "../../providers/repositories/servicesRepositories.js";

const searchServices = async (req, res) => {
  try {

    const { term } = req.query;

    const services = await searchService(term);
      if (!services || services.length === 0) {
      return handleError(
        res,
        StatusCodes.NOT_FOUND,
        "Service not found"
      );
    }
    return handleSuccess(
      res,StatusCodes.OK,
      "Services found successfully",
      services
    );

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);

  }
};

 const allServices = async (req, res) => {
  try {
    const services = await getServices();
   
    return handleSuccess(res, StatusCodes.OK, "Services fetched", services);

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export {searchServices,allServices}

