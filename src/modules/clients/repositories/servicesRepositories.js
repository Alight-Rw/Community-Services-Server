import RequestedServices from "../../../database/models/RequestedServices.js";
import Service from "../../../database/models/services.js";

const searchService = (query) => {
  return Service.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category"
      }
    },
    {
      $unwind: "$category"
    },
    {
      $match: {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { "category.categoryName": { $regex: query, $options: "i" } }
        ]
      }
    }
  ]);
};

const createRequestedServices = async(data)=>{
    return await RequestedServices.create(data)
}
const FindRequestedServiceById = async(id)=>{
    return await Service.findById(id)
}
const FindRequestedServicesInfo = async (clientId, status) => {
  const query = {
    clientId: clientId
  };

  if (status && status !== "all") {
    query.status = status;
  }

  return await RequestedServices.find(query);
};
const getServices = ()=>{
    return Service.find()
}

export {
          searchService,
          createRequestedServices,
          FindRequestedServiceById,
          FindRequestedServicesInfo,
          getServices

 };