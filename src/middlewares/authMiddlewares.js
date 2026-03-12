import { StatusCodes } from "http-status-codes"
import { findUser, FindUserByID } from "../modules/auth/authRepositories.js"
import { handleError } from "../utils/responseUtils.js"

import { verifyToken } from "../utils/jwtUtils.js";
import mongoose from "mongoose";


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

const verifyAccessToken = (passRoles) => {
  return async (req,res,next)=>{
       try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return handleError(res, StatusCodes.UNAUTHORIZED, "Token missing");
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return handleError(res, StatusCodes.UNAUTHORIZED, "Invalid token format");
    }

    const token = parts[1];

    const decoded = verifyToken(token);

    if (!decoded?.id) {
      return handleError(res, StatusCodes.UNAUTHORIZED, "Invalid token");
    }

    const user = await FindUserByID(decoded.id);

    if (!user) {
      return handleError(res, StatusCodes.NOT_FOUND, "Unauthenticated");
    }

    if (!passRoles.includes(user.role)) {
          return res.status(401).json({ status: 403, message: 'Unauthorized' });
        }

    req.user = user;
    req.token = token;

    next();

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
  }
};

const isProviderIdExist = async (req, res, next) => {
  try {
    const { providerId } = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(providerId)) {
      return handleError(res, StatusCodes.BAD_REQUEST, "Invalid providerId");
    }

   
    const provider = await FindUserByID(providerId); 

    
    if (!provider || provider.role !== "provider") {
      return handleError(res, StatusCodes.BAD_REQUEST, "Provider not found");
    }

    req.provider = provider;

    next();
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};


export {
    isAccountFind,isPasswordMatch,isAccountVerified,checkUser,isTokenExist,verifyAccessToken,isProviderIdExist
}
