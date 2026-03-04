/** @format */
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../../utils/passwordUtils.js';
import { handleError, handleSuccess } from '../../utils/responseUtils.js';
import { createToken, createUser, deleteToken, updateVerify} from './authRepositories.js';

import { generateAccessToken } from '../../utils/jwtUtils.js';


import { sendEmail } from '../../services/sendEmail.js';
import Token from '../../database/models/tokens.js';

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
    await createToken(token, user.id)

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
    const { deviceId } = req.body;
    const user = req.user;
    const token = generateAccessToken(user?._id, deviceId);
    await Token.findOneAndUpdate(
      { userId: user._id, deviceId },
      { token },
      { upsert: true, returnDocument:'after' },
    );
    return handleSuccess(res, StatusCodes.OK, "Login successfully", token);
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};
const forgotPassword = async (req, res) => {
  try {

    const user = req.user
    const token = generateAccessToken(user?._id);
    await createToken(token, user._id);


    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail({ action: 'forgot-password', receiverEmail: user.email, link: resetUrl });

    return handleSuccess(res, StatusCodes.OK, 'Password reset email sent');

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};


const verifyAccount = async (req, res) => {
  try {
    const user = req.user;
    const token = req.token;

    
     const updatedUser = await updateVerify (
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


export { signUpProvider, singUpClient, login, forgotPassword, verifyAccount };
