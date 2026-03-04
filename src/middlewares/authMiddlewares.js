import { StatusCodes } from "http-status-codes";
import { findUser, findUserById } from "../modules/auth/authRepositories.js";
import { handleError } from "../utils/responseUtils.js";
import Token from "../database/models/tokens.js";
import { verifyToken } from "../utils/jwtUtils.js";
const checkUser = (mode) => {
  return async (req, res, next) => {
    try {
      const user = await findUser({ email: req.body.email });
      if (mode === "isConflict" && user) {
        return handleError(
          res,
          StatusCodes.CONFLICT,
          "Account already exists"
        );
      }
      if (mode === "notUser" && !user) {
        return handleError(
          res,
          StatusCodes.NOT_FOUND,
          "User not found"
        );
      }
      if (user) {
        req.user = user;
      }

      next();
    } catch (error) {
      return handleError(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message
      );
    }
  };
};

export { checkUser };