/** @format */
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../../utils/passwordUtils.js';
import { handleError, handleSuccess } from '../../utils/responseUtils.js';
import { createUser } from './authRepositories.js';
import { sendEmail } from '../../utils/emailTamplents/sendEmail.js';
import { verifyAccountTemplate } from '../../utils/emailTamplents/verifyEmailTamplent.js';
import { generateAccessToken } from '../../utils/jwtUtils.js';

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

    const verifyLink = `${process.env.CLIENT_URL}/verified-email/${token}`;

    await sendEmail({
      to: user.email,
      subject:"email notification",
      html: verifyAccountTemplate(user.email, verifyLink),
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

export { signUpProvider, singUpClient };