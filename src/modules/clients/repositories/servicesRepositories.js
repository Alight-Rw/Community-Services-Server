import RequestedServices from "../../../database/models/RequestedServices.js";
import Service from "../../../database/models/services.js";
import Category from "../../../database/models/Category.js";
import User from "../../../database/models/users.js";
import {
  buildPaginationMeta,
  createSearchRegex,
  normalizeRequestedStatus,
  parsePaginationQuery,
} from "../../../utils/queryUtils.js";

const buildServiceQuery = async ({
  search,
  serviceName,
  category,
  location,
  isActive,
  providerId,
} = {}) => {
  const conditions = [];

  const searchRegex = createSearchRegex(search);
  const serviceNameRegex = createSearchRegex(serviceName);

  if (providerId) {
    conditions.push({ providerId });
  }

  if (typeof isActive === "boolean") {
    conditions.push({ isActive });
  }

  if (location) {
    const locationRegex = createSearchRegex(location);
    if (locationRegex) {
      conditions.push({ location: locationRegex });
    }
  }

  if (category) {
    const categoryRegex = createSearchRegex(category);
    if (categoryRegex) {
      const matchedCategories = await Category.find({
        categoryName: categoryRegex,
      })
        .select("_id")
        .lean();

      conditions.push({
        category: { $in: matchedCategories.map((item) => item._id) },
      });
    }
  }

  if (serviceNameRegex) {
    conditions.push({ name: serviceNameRegex });
  }

  if (searchRegex) {
    const matchedCategories = await Category.find({
      categoryName: searchRegex,
    })
      .select("_id")
      .lean();

    const searchConditions = [
      { name: searchRegex },
      { description: searchRegex },
      { location: searchRegex },
    ];

    if (matchedCategories.length > 0) {
      searchConditions.push({
        category: { $in: matchedCategories.map((item) => item._id) },
      });
    }

    conditions.push({ $or: searchConditions });
  }

  return conditions.length > 0 ? { $and: conditions } : {};
};

const buildRequestedServicesQuery = async ({
  ownerField,
  ownerId,
  status,
  search,
}) => {
  const query = {
    [ownerField]: ownerId,
  };

  const normalizedStatus = normalizeRequestedStatus(status);
  if (normalizedStatus && normalizedStatus !== "all") {
    query.status = normalizedStatus;
  }

  const searchRegex = createSearchRegex(search);
  if (!searchRegex) {
    return query;
  }

  const [serviceMatches, userMatches] = await Promise.all([
    Service.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { location: searchRegex },
      ],
    })
      .select("_id")
      .lean(),
    User.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { location: searchRegex },
        { phone: searchRegex },
      ],
    })
      .select("_id")
      .lean(),
  ]);

  const serviceIds = serviceMatches.map((item) => item._id);
  const userIds = userMatches.map((item) => item._id);

  query.$or = [
    { fullName: searchRegex },
    { email: searchRegex },
    { location: searchRegex },
    { requestNote: searchRegex },
    { rejectionNote: searchRegex },
  ];

  if (serviceIds.length > 0) {
    query.$or.push({ serviceId: { $in: serviceIds } });
  }

  if (userIds.length > 0) {
    query.$or.push({ providerId: { $in: userIds } });
    query.$or.push({ clientId: { $in: userIds } });
  }

  return query;
};

const searchService = async (query, options = {}) => {
  const { page, limit, skip, sort, hasPagination } = parsePaginationQuery(
    options,
    { sort: "-createdAt" }
  );
  const filter = await buildServiceQuery({ search: query });

  const mongoQuery = Service.find(filter).sort(sort).lean();

  if (hasPagination) {
    mongoQuery.skip(skip).limit(limit);
  }

  const [items, totalRecords] = await Promise.all([
    mongoQuery.exec(),
    Service.countDocuments(filter),
  ]);

  return {
    items,
    pagination: buildPaginationMeta(totalRecords, page, limit),
  };
};

const createRequestedServices = async (data) => {
  return await RequestedServices.create(data);
};

const FindRequestedServiceById = async (id) => {
  return await Service.findById(id);
};

const FindRequestedServicesInfo = async (clientId, status, options = {}) => {
  return await findRequestedServicesByOwner("clientId", clientId, status, options);
};

const findRequestedServicesByOwner = async (
  ownerField,
  ownerId,
  status,
  options = {}
) => {
  const { page, limit, skip, sort, hasPagination, search } =
    parsePaginationQuery(options, { sort: "-createdAt" });

  const query = await buildRequestedServicesQuery({
    ownerField,
    ownerId,
    status,
    search,
  });

  const mongoQuery = RequestedServices.find(query).sort(sort).lean();

  if (hasPagination) {
    mongoQuery.skip(skip).limit(limit);
  }

  const [items, totalRecords] = await Promise.all([
    mongoQuery.exec(),
    RequestedServices.countDocuments(query),
  ]);

  return {
    items,
    pagination: buildPaginationMeta(totalRecords, page, limit),
  };
};

const getServices = () => {
  return Service.find();
};

const listServices = async (options = {}) => {
  const { page, limit, skip, sort, hasPagination, search } =
    parsePaginationQuery(options, { sort: "-createdAt" });
  const category = typeof options.category === "string"
    ? options.category.trim()
    : "";
  const location = typeof options.location === "string"
    ? options.location.trim()
    : "";
  const serviceName = typeof options.serviceName === "string"
    ? options.serviceName.trim()
    : "";

  const filter = await buildServiceQuery({
    search,
    serviceName,
    category,
    location,
    isActive: options.isActive,
    providerId: options.providerId,
  });

  const mongoQuery = Service.find(filter).sort(sort).lean();

  if (hasPagination) {
    mongoQuery.skip(skip).limit(limit);
  }

  const [items, totalRecords] = await Promise.all([
    mongoQuery.exec(),
    Service.countDocuments(filter),
  ]);

  return {
    items,
    pagination: buildPaginationMeta(totalRecords, page, limit),
  };
};

export {
  searchService,
  createRequestedServices,
  FindRequestedServiceById,
  FindRequestedServicesInfo,
  findRequestedServicesByOwner,
  getServices,
  listServices,
};