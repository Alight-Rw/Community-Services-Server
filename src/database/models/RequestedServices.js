/** @format */

import mongoose from 'mongoose';

const RequestedServicesSchema = new mongoose.Schema({

  clientId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
  },

  providerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  
  },

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

RequestedServicesSchema.pre(/^find/, function () {
  this.populate([
    { path: 'serviceId', select: 'avatar name price ' },
     { path: 'providerId', select: 'firstName lastName email ' },
     { path: 'clientId', select: 'firstName lastName email' }
])
 
});

const RequestedServices = mongoose.model(
  'RequestedServices',
  RequestedServicesSchema,
);
export default RequestedServices;
