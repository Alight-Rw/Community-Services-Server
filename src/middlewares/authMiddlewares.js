import { StatusCodes } from "http-status-codes"
import { findUser, FindUserByID } from "../modules/auth/authRepositories.js"
import { handleError } from "../utils/responseUtils.js"
import { comparePassword } from "../utils/passwordUtils.js";
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
  }
};

const isAccountFind=async(req,res,next)=>{
  try {
    const user=await findUser({email:req.body.email})
    if(!user){
      return handleError(res,StatusCodes.UNAUTHORIZED,"Invalid Email or Password")
    }
    req.user=user
    return next()
  } catch (error) {
    return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error)
  }

};
const isPasswordMatch=async(req,res,next)=>{
try {
  const isMatch= await comparePassword(req.body.password,req.user.password)
  if(!isMatch){
     return handleError(res,StatusCodes.UNAUTHORIZED,"Invalid Email or Password")
  }
  return next()
} catch (error) {
   return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error)
}
};
const isAccountVerified=(req,res,next)=>{
 try {
   if(!req.user.isVerified){
    return handleError(res,StatusCodes.UNAUTHORIZED,"Please verify your Account")
  }
  return next()
 } catch (error) {
   return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error)
 }
}


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


export {
    isAccountFind,isPasswordMatch,isAccountVerified,checkUser,isTokenExist
}
