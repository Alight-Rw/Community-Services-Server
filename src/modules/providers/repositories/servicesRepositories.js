import Service from "../../../database/models/services.js"
const createService=(data)=>{
    return Service.create(data)
}
const getServices = ()=>{
    return Service.find()
     
}
const searchService = (query) => {
  return Service.find({
    name: { $regex: query, $options: "i" }
  });
}
const deleteService = (id) => {
  return Service.findByIdAndDelete(id);
};

export {createService,getServices,searchService,deleteService}
