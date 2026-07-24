const DEFAULT_PAGE = 1;

const escapeRegExp = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createSearchRegex = (value) => {
  const normalized = typeof value === "string" ? value.trim() : "";

  if (!normalized) {
    return null;
  }

  return new RegExp(escapeRegExp(normalized), "i");
};

const parsePositiveInteger = (value, fallback = null) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  if (value === "all") {
    return null;
  }

  const parsed = Number.parseInt(value, 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const parsePaginationQuery = (query = {}, defaults = {}) => {
  const page = parsePositiveInteger(query.page, DEFAULT_PAGE) || DEFAULT_PAGE;
  const limit = parsePositiveInteger(query.limit, defaults.limit ?? null);
  const sort = typeof query.sort === "string" && query.sort.trim()
    ? query.sort.trim()
    : defaults.sort ?? "-createdAt";
  const search = typeof query.search === "string"
    ? query.search.trim()
    : typeof query.term === "string"
      ? query.term.trim()
      : "";

  return {
    page,
    limit,
    skip: limit ? (page - 1) * limit : 0,
    sort,
    search,
    hasPagination: Number.isFinite(limit) && limit !== null,
  };
};

const buildPaginationMeta = (totalRecords, page, limit) => {
  if (!limit) {
    return {
      totalRecords,
      currentPage: 1,
      pageSize: totalRecords,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: null,
      prevPage: null,
    };
  }

  const totalPages = Math.max(Math.ceil(totalRecords / limit), 1);
  const currentPage = Math.min(page, totalPages);

  return {
    totalRecords,
    currentPage,
    pageSize: limit,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
  };
};

const normalizeRequestedStatus = (status) => {
  if (!status || status === "all") {
    return "all";
  }

  const normalized = status.toString().trim().toLowerCase();
  const statusMap = {
    waiting: "Waitting",
    waitting: "Waitting",
    approved: "Approved",
    approve: "Approved",
    completed: "Completed",
    complete: "Completed",
    rejected: "Rejected",
    reject: "Rejected",
  };

  return statusMap[normalized] || status;
};

export {
  buildPaginationMeta,
  createSearchRegex,
  normalizeRequestedStatus,
  parsePaginationQuery,
};
