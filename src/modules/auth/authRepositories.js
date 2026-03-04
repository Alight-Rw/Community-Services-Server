

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
};

const updateVerify = (id, updateData) =>
  User.updateOne({ _id: id }, updateData);

const FindUserByID = async(id)=>{
  return await User.findById(id)
}
 const deleteToken = (token) =>{
  return Token.deleteOne({ token });
 }
export {
  createUser,
  findUser,
  FindUserByID,
  createToken,
  updateVerify,
  deleteToken,
  
  
}