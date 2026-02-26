
import Token from "../../database/models/tokens.js"
import User from "../../database/models/users.js"

const createUser = (data) => {
  return User.create(data)
}

const findUser = (email) => {
  return User.findOne(email)
} 

const createToken = (token, userId) => {
  return Token.create({
    token: token,
    userId: userId,
  });
};
export {
  createUser,
  findUser,
  createToken,
  
}