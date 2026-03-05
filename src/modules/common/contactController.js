import { StatusCodes } from "http-status-codes";
import { sendEmail } from "../../services/sendEmail.js";
import { handleSuccess } from "../../utils/responseUtils.js";

const ContactUsMessage = async (req, res) => {

  const { fullName, email, subject, message } = req.body;

  await sendEmail({
    action: "contact-us",
    receiverEmail: process.env.SMTP_GMAIL_SENDER_EMAIL,
    fullName: fullName,
    email: email,
    subject: subject,
    message: message
  });

  return handleSuccess(res, StatusCodes.OK, 'Message sent successfully',req.body);

};

export{
    ContactUsMessage
}