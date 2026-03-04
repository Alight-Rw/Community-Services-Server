
import Token from "../../database/models/tokens.js"
import User from "../../database/models/users.js"

const createUser = (data) => {
  return User.create(data)
}

const findUser = (email) => {
  return User.findOne(email)
} 

const findUserById =(id)=>{
  return User.findById(id)
}

const createToken = (token, userId) => {
  return Token.create({token,userId});
};
export {
  createUser,
  findUser,
  createToken,
  findUserById
  
}