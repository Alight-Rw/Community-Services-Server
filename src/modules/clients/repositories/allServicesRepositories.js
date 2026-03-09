import { Service } from "../../../database/models/servicesModels.js";
export const getAllservices = async () => {
    return await Service.find();
}