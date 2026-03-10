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
};

export {createService,getServices,searchService}
