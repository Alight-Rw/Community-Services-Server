
import User from "../../database/models/users.js";

export const createUser = (data) => {
  return User.create(data);
};
export const findUser = (email) => {

  return User.findOne({ email });
};
