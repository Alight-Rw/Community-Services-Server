import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../../utils/passwordUtils.js';
import { handleError, handleSuccess } from '../../utils/responseUtils.js';
import { createUser, findUser } from './authRepositories.js';
import { sendEmail } from '../../utils/emailTamplents/sendEmail.js';
import { verifyAccountTemplate } from '../../utils/emailTamplents/verifyEmailTamplent.js';
import { generateAccessToken } from '../../utils/jwtUtils.js';
import { forgotPasswordTemplate } from '../../utils/emailTamplents/forgotpasswordTemplate.js';
import { randomBytes } from 'crypto';

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
      role: 'client',
      isVerified: false,
      password: hashPassword(req.body.password),
    });

    const token = generateAccessToken(user?.id);
    user.verifyToken = token;
    await user.save();

    const verificastionURL = `${process.env.VERIFICATION_URL}/${token}`;

    await sendEmail({
      to: user.email,
      subject: "email notification",
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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUser({ email });
    if (!user) return handleError(res, StatusCodes.NOT_FOUND, 'User not found');

   const token = randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset',
      html: forgotPasswordTemplate(user.email, resetUrl),
    });

    return handleSuccess(res, StatusCodes.OK, 'Password reset email sent');
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export { signUpProvider, singUpClient,forgotPassword };
