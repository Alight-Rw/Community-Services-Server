import { StatusCodes } from "http-status-codes"
import { findUser } from "../modules/auth/authRepositories.js"
import { handleError } from "../utils/responseUtils.js"

const isAccountExist = async (req,res,next) =>{
  try {
    const isUserExist = await findUser({email:req.body.email}) 
    if(isUserExist){
       return handleError(res,StatusCodes.CONFLICT,'Account already exist')
    }
    return next()
  } catch (error) {
    return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error)
  }
}
export {
    isAccountExist
}