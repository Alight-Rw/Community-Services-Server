import User from "../../database/models/users.js"

const createUser = (data) => {
  return User.create(data)
}

const findUser = (email) => {
  return User.findOne(email)
}
export {
  createUser,
  findUser
}