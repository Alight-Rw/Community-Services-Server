
import RequestedServices from "../../../database/models/RequestedServices.js"
import Service from "../../../database/models/services.js"


const createRequestedServices = async(data)=>{
    return RequestedServices.create(data)
}
const FindById = async(id)=>{
    return Service.findById(id)
}
const FindRequestedServicesInfo =()=>{
    return RequestedServices.find()
}

export {
  createRequestedServices,
    FindById,
     FindRequestedServicesInfo
}