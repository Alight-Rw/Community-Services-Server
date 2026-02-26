/** @format */
// import { StatusCodes } from "http-status-codes";
// import { comparePassword, hashPassword } from "../../utils/passwordUtils.js";
// import { handleError, handleSuccess } from "../../utils/responseUtils.js";
// import { createUser, findUser } from "./authRepositories.js";
// import { sendEmail } from "../../utils/emailTamplents/sendEmail.js";
// import { verifyAccountTemplate } from "../../utils/emailTamplents/verifyEmailTamplent.js";
// import { generateAccessToken } from "../../utils/jwtUtils.js";
// import bcrypt from "bcrypt";

// -------
/** @format */
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../../utils/passwordUtils.js';
import { handleError, handleSuccess } from '../../utils/responseUtils.js';
import { createUser, findUser } from './authRepositories.js';

import { generateAccessToken } from '../../utils/jwtUtils.js';
import User from '../../database/models/users.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../services/sendEmail.js';

const signUpProvider = async (req, res) => {
  try {
    delete req.body.confirmPassword;
    const user = await createUser({
      ...req.body,
      role:'provider',
      isVerified: true,
      password: hashPassword(req.body.password),
    });

    return handleSuccess(
      res,
      StatusCodes.CREATED,
      'Provider successfully created',
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
      role: 'client',
      isVerified: false,
      password: hashPassword(req.body.password),
    });

    const token = generateAccessToken(user?.id);
    user.verifyToken = token;
    await user.save();

    const verificastionURL = `${process.env.VERIFICATION_URL}/${token}`;

    await sendEmail('verify-account', user.email, verificastionURL)
    return handleSuccess( res, StatusCodes.CREATED, 'Client created successfully', user );

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
    return handleSuccess(res, StatusCodes.OK, token);
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return handleError(res, StatusCodes.BAD_REQUEST, 'Token is required');
    }

    
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return handleError(res, StatusCodes.BAD_REQUEST, 'Invalid or expired token');
    }

    
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return handleError(res, StatusCodes.BAD_REQUEST, 'Invalid token');
    }

    if (user.isVerified) {
      return handleError(res, StatusCodes.BAD_REQUEST, 'Account already verified');
    }

    if (user.verificationTokenExpires < Date.now()) {
      return handleError(res, StatusCodes.BAD_REQUEST, 'Token expired');
    }

  
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    return handleSuccess(res, StatusCodes.OK, 'Account verified successfully');
  } catch (error) {
    
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }
};

export { signUpProvider, singUpClient ,login, verifyAccount};
