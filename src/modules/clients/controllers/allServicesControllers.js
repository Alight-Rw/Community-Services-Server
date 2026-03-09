import { getAllservices } from "../repositories/allServicesRepositories.js";
import { StatusCodes } from "http-status-codes";

export const fetchaAllServices = async (req, res) => {
    try {
        const services = await getAllservices();
        res.status(StatusCodes.OK).json({
success: true,
      message: "Services fetched successfully",
      data: services,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error fetching services",
            data: null,
        });
    }
}