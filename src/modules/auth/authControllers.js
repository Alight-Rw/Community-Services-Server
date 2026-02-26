
/** @format */
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../../utils/passwordUtils.js';
import { handleError, handleSuccess } from '../../utils/responseUtils.js';
import { createToken, createUser, findUser } from './authRepositories.js';

import { generateAccessToken } from '../../utils/jwtUtils.js';

import jwt from 'jsonwebtoken';
import { sendEmail } from '../../services/sendEmail.js';

const signUpProvider = async (req, res) => {
  try {
    delete req.body.confirmPassword;
    const user = await createUser({
      ...req.body,
      role: 'provider',
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
      'Client created successfully',
      user
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



export { signUpProvider, singUpClient ,login};
