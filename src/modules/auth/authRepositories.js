
import Token from "../../database/models/tokens.js"
import User from "../../database/models/users.js"

const createUser = (data) => {
  return User.create(data)
}

const findUser = (email) => {
  return User.findOne(email)
} 

const createToken = (token, userId) => {
  return Token.create({token,userId});
}
const deleteToken = async (token, userId) => {
  const result = await Token.deleteOne({ token, userId });
};

const updateVerify = (id, updateData) =>
  User.updateOne({ _id: id }, updateData);

const FindUserByID = async(id)=>{
  return await User.findById(id)
}
 const deleteOneToken = ({userId,deviceId}) =>{
  return Token.findOneAndDelete({userId,deviceId});
 }

 const findToken = ({userId,token}) =>{
  return Token.findOne({userId,token});
 }

 const updatedProfile = (userId,data)=>{
  return User.findByIdAndUpdate(
  userId,
  data,
  { returnDocument: "after" })
 }
export {
  createUser,
  findUser,
  createToken,
  updateVerify,
  FindUserByID,
  deleteToken ,
  findToken,
  deleteOneToken,
  updatedProfile
}