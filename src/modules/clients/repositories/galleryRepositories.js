import Gallery from "../../../database/models/Gallery.js"
import {
  buildPaginationMeta,
  createSearchRegex,
  parsePaginationQuery,
} from "../../../utils/queryUtils.js";

const FindGallery = () =>{
    return  Gallery.find()
}

const createGallery = (data)=>{
    return Gallery.create(data)
}

const listGallery = async (options = {}) => {
  const { page, limit, skip, sort, hasPagination, search } =
    parsePaginationQuery(options, { sort: "-createAt" });

  const searchRegex = createSearchRegex(search);
  const filter = searchRegex
    ? {
        $or: [
          { title: searchRegex },
          { description: searchRegex },
        ],
      }
    : {};

  const mongoQuery = Gallery.find(filter).sort(sort).lean();

  if (hasPagination) {
    mongoQuery.skip(skip).limit(limit);
  }

  const [items, totalRecords] = await Promise.all([
    mongoQuery.exec(),
    Gallery.countDocuments(filter),
  ]);

  return {
    items,
    pagination: buildPaginationMeta(totalRecords, page, limit),
  };
};

export {
     FindGallery,
     createGallery,
     listGallery,
    
}
