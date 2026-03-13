import RequestedServices from "../../../database/models/RequestedServices.js"
import Service from "../../../database/models/services.js"
const createService=(data)=>{
    return Service.create(data)
}
const getServices = ()=>{
    return Service.find()
}

const FindRequestedServicesInfo = async(providerId, status)=>{
        return await RequestedServices.find()
         .where("providerId").equals(providerId )
         .where("status").equals(status)
        
};
const findServiceById=(id)=>{
    return Service.findById(id)
};
const findServiceByIdAndUpdate=(id,data)=>{
    return Service.findByIdAndUpdate(id,data,{new:true})

}
     
export {createService,getServices,FindRequestedServicesInfo,findServiceById,findServiceByIdAndUpdate}
