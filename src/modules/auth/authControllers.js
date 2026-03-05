/** @format */
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../../utils/passwordUtils.js';
import { handleError, handleSuccess } from '../../utils/responseUtils.js';
import { createToken, createUser, deleteToken,deleteOneToken,FindUserByID, updateVerify} from './authRepositories.js';
import { generateAccessToken } from '../../utils/jwtUtils.js';
import { sendEmail } from '../../services/sendEmail.js';
import Token from '../../database/models/tokens.js';
import User from '../../database/models/users.js';

const signUpProvider = async (req, res) => {
  try {
    delete req.body.confirmPassword;
    const user = await createUser({
      ...req.body,
      role: "provider",
      isVerified: true,
      password: hashPassword(req.body.password),
    });

    return handleSuccess(
      res,
      StatusCodes.CREATED,
      "Provider successfully created",
      user,
    );
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error);
  }
};

const singUpClient = async (req, res) => {
  try {
    const user = await createUser({
      ...req.body,
      password: hashPassword(req.body.password),
    });

    const token = generateAccessToken(user?.id);
    await createToken(token,user.id)

    const verifyLink = `${process.env.CLIENT_URL}/verified-email/${token}`;

    await sendEmail({
      action: "verify-account",
      receiverEmail: user.email,
      link: verifyLink,
    });

    return handleSuccess(
      res,
      StatusCodes.CREATED,
      "Client created successfully",
      user,
    );
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error);
  }
};
const login = async (req, res) => {
  try {
     const { email, password } = req.body;
     const user = await findUser({ email });
    if (!user) {
      return handleError(
        res,
        StatusCodes.UNAUTHORIZED,
        "Invalid email or Password",
      );
    }
    comparePassword(password,user.password)
    if (!comparePassword) {
      return handleError(
        res,
        StatusCodes.UNAUTHORIZED,
        "Invalid email or Password",
      );
    }
    if (!user.isVerified) {
      return handleError(
        res,
        StatusCodes.UNAUTHORIZED,
        "Please verify your Account",
      );
    }
    const token = generateAccessToken(user?._id);
    return handleSuccess(res, StatusCodes.OK,"Login successfully", token);
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};
const forgotPassword = async (req, res) => {
  try {
    
 
    const token = generateAccessToken(user._id);
    await createToken({token,id:user._id})
     

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail({  action:  'forgot-password',  receiverEmail:  user.email,  link:  resetUrl  });

    return handleSuccess(res, StatusCodes.OK, 'Password reset email sent');

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName,lastName, email, phone, location } = req.body;
    const userId = req.user?._id;

   const updatedUser = await User.findByIdAndUpdate(
  userId,
  { firstName, lastName, email, phone, location },
  { returnDocument: "after" }
);

    return handleSuccess(
      res, StatusCodes.OK, 'Profile updated successfully',updatedUser);
    
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message );
  }
};

const verifyAccount = async (req, res) => {
  try {
    const user = req.user;
    const token = req.token;
    
      await updateVerify (
      { _id: user._id },
      { $set: { isVerified: true } }
    );

    
    await deleteToken(token, user._id);

    return handleSuccess(
      res,
      StatusCodes.CREATED,
      "Account verified successfully successfully",
      
    );
  } catch (error) {
    return handleError(res, 500, error.message);
  }

};


const Logout = async (req, res) => {
  try {
    const deviceId = req.deviceId
    const user = req.user;

    await deleteOneToken({
      userId: user._id,
      deviceId
    });

    return handleSuccess(res, StatusCodes.OK, "Logged out successfully");

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getprofile = async(req,res)=>{
   const user = req.user 
   try {
    const userprofile = await FindUserByID(user?._id)
    return handleSuccess(res,StatusCodes.OK,"Profile retrived",userprofile)
   } catch (error) {
    return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error.message)
   }
}

export { signUpProvider, singUpClient, login, forgotPassword, verifyAccount ,Logout,getprofile,updateProfile};
