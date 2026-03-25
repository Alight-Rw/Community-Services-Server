/** @format */

import User from "../../../database/models/users.js";
import Service from "../../../database/models/services.js";
import RequestedServices from "../../../database/models/RequestedServices.js";

export const checkProviderCanDelete = async (userId) => {
  const services = await Service.find({ providerId: userId });
  const serviceIds = services.map((s) => s._id);

  const requests = await RequestedServices.find({
    $or: [
      { providerId: userId },
      { serviceId: { $in: serviceIds } },
    ],
  });

  const hasActiveRequests = requests.some(
    (req) => req.status === "Waitting" || req.status === "Approved"
  );

  return {
    canDelete: !hasActiveRequests,
    serviceIds,
  };
};

export const checkClientCanDelete = async (userId) => {
  const requests = await RequestedServices.find({ clientId: userId });

  const hasActiveRequests = requests.some(
    (req) => req.status === "Waitting" || req.status === "Approved"
  );

  return {
    canDelete: !hasActiveRequests,
  };
};

export const deleteProviderData = async (userId, serviceIds) => {
  await RequestedServices.deleteMany({
    $or: [
      { providerId: userId },
      { serviceId: { $in: serviceIds } },
    ],
  });

  await Service.deleteMany({ providerId: userId });

  await User.findByIdAndDelete(userId);
};

export const deleteClientData = async (userId) => {
  await RequestedServices.deleteMany({ clientId: userId });

  await User.findByIdAndDelete(userId);
};