/** @format */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
 avatar:{
   type:String,
   required:false,
   default:null
 },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
   location: {
    type: String,
    required:false,
    default:null
  },

  phone: {
    type: String,
    required:false,
    default:null
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['client', 'provider'],
    default: 'client',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

const User = mongoose.model('User', userSchema);
export default User;
