import RequestedServices from "../../../database/models/RequestedServices.js";
import Service from "../../../database/models/services.js";

const searchService = (query) => {
  return Service.find({
    $or: [
      {
        name: {
          $regex: query,
          $options: "i",
        },
      },
      {
        location: {
          $regex: query,
          $options: "i",
        },
      },
    ],
  });
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