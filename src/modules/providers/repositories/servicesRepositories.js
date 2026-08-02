import RequestedServices from "../../../database/models/RequestedServices.js"
import Service from "../../../database/models/services.js"
import {
  findRequestedServicesByOwner,
  listServices,
} from "../../clients/repositories/servicesRepositories.js"


const createService=(data)=>{
    return Service.create(data)
}

const getProviderServices = async (user) => {
  if (user?.role === "provider") {
    return await Service.find({ providerId: user._id });
  }

  return await Service.find();
};

const FindProviderRequestedServicesInfo = async (providerId, status, options = {}) => {
  return await findRequestedServicesByOwner("providerId", providerId, status, options);
};

const findServiceById=(id)=>{
    return Service.findById(id)
};
const findRequestServiceById=(id)=>{
    return RequestedServices.findById(id)
};
const findServiceByIdAndUpdate=(id,data)=>{
    return Service.findByIdAndUpdate(id,data,{new:true})

}

const findRequestByIdAndUpdate=(id,status)=>{
    return RequestedServices.findByIdAndUpdate(id, status, {
    returnDocument: 'after',
  });

}

 const checkServiceOwnership = (service, providerId) => {
  if (!service || !providerId) return false;
  const ownerId = service.providerId._id 
    ? service.providerId._id.toString() 
    : service.providerId.toString();
    
  const currentUserId = providerId.toString();

  return ownerId === currentUserId;
};
 const checkServiceCanBeDeleted = async (serviceId) => {
  const requests = await RequestedServices.find({ serviceId });

  const hasActiveRequests = requests.some(
    (req) => req.status === "Waiting" || req.status === "Approved"
  );

  return {
    canDelete: !hasActiveRequests,
  };
};

const deleteServiceWithRequests = async (serviceId) => {
  await RequestedServices.deleteMany({ serviceId });
  await Service.findByIdAndDelete(serviceId);
};

const listProviderServices = async (user, options = {}) => {
  return await listServices({
    ...options,
    providerId: user?._id,
  });
};
     
export {createService,getProviderServices,findRequestByIdAndUpdate,findRequestServiceById,FindProviderRequestedServicesInfo,findServiceById,findServiceByIdAndUpdate,deleteServiceWithRequests,checkServiceCanBeDeleted,checkServiceOwnership,listProviderServices}
