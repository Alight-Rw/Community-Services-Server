import RequestedServices from "../../../database/models/RequestedServices.js"
import Service from "../../../database/models/services.js"
const createService=(data)=>{
    return Service.create(data)
}
const getServices = ()=>{
    return Service.find()
}

const FindRequestedServicesInfo = async (providerId, status) => {
  const query = {
    clientId: providerId
  };

  if (status && status !== "all") {
    query.status = status;
  }

  return await RequestedServices.find(query);
};

const findServiceById=(id)=>{
    return Service.findById(id)
};
const findServiceByIdAndUpdate=(id,data)=>{
    return Service.findByIdAndUpdate(id,data,{new:true})

}
     
export {createService,getServices,FindRequestedServicesInfo,findServiceById,findServiceByIdAndUpdate}
