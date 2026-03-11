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

export { searchService };