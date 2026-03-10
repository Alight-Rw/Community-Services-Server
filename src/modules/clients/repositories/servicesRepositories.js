import Service from "../../../database/models/services.js"

const searchService = (query) => {
  return Service.find({
    name: { $regex: query, $options: "i" }
  });
};

export {searchService}