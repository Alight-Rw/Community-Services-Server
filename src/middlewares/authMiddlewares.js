import { StatusCodes } from "http-status-codes";
import { findUser, FindUserByID } from "../modules/auth/authRepositories.js";
import { handleError } from "../utils/responseUtils.js";
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

const isTokenExist = async (req, res, next) => {
  try {
    const { token } = req.params;

    const decodedToken = verifyToken(token);

    if (!decodedToken?.id) {
      return handleError(res, 404, "Invalid or expired token");
    }

    const user = await FindUserByID(decodedToken.id);

    if (!user) {
      return handleError(res, 404, "User not found");
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    return handleError(res, 401, "Invalid or expired token");
  }
};

export { checkUser ,isTokenExist };













