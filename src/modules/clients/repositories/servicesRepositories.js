import Service from "../../../database/models/services.js";

export const getServices = async () => {
    return await Service.find();
}
