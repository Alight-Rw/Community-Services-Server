import Category from "../../../database/models/Category.js";
import {
  buildPaginationMeta,
  createSearchRegex,
  parsePaginationQuery,
} from "../../../utils/queryUtils.js";

export const findCategory = async (categoryName) => {
  return await Category.findOne({ categoryName });
};

export const createCategory = (data) => {
  return Category.create(data);
};

export const getAllCategories = async () => {
  return await Category.find();
};

export const listCategories = async (options = {}) => {
  const { page, limit, skip, sort, hasPagination, search } =
    parsePaginationQuery(options, { sort: "categoryName" });

  const filter = {};
  const searchRegex = createSearchRegex(search);

  if (searchRegex) {
    filter.categoryName = searchRegex;
  }

  const mongoQuery = Category.find(filter).sort(sort).lean();

  if (hasPagination) {
    mongoQuery.skip(skip).limit(limit);
  }

  const [items, totalRecords] = await Promise.all([
    mongoQuery.exec(),
    Category.countDocuments(filter),
  ]);

  return {
    items,
    pagination: buildPaginationMeta(totalRecords, page, limit),
  };
};
