/** @format */

import mongoose from 'mongoose';

const RequestedServicesSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Types.ObjectId,
    ref: 'Service',
  },
  Date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },
  requestNote: {
    type: String,
    required: false
  },
  rejectionNote: {
    type: String,
    default: null,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Waitting', 'Approved', 'Completed', 'Rejected'],
    default: 'Waitting',
  },

  createAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

RequestedServicesSchema.pre(/^find/, function (next) {
  this.populate({ path: 'serviceId', select: 'name price' });
  next();
});

const RequestedServices = mongoose.model(
  ' RequestedServices',
  RequestedServicesSchema,
);
export default RequestedServices;
