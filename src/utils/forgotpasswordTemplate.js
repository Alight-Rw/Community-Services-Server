/** @format */

export const forgotPasswordTemplate = (receiverEmail, action, link) => {
  return {
    to: receiverEmail,
    subject: `COMMUNITY SERVICES TEAM ${action}`,
    from: `COMMUNITY SERVICES TEAM <${process.env.SMTP_GMAIL_SENDER_EMAIL}>`,
    text: 'Hello From COMMUNITY SERVICES TEAM, We received a request to verify your account.',
    html: `<table cellpadding="20" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #E8F4FD 0%, #D6E9F7 100%);">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table style="max-width: 600px; width: 85%; background-color: #FFFFFF; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); overflow: hidden;">
            
            <tr>
              <td style="background: #408BF6; padding: 12px; text-align: center;">
                <span style="color: #FFFFFF; margin:0; font-size: 22px; font-weight:600;">COMMUNITY SERVICES</span>
              </td>
            </tr>

            <tr>
              <td style="padding: 20px 30px;">
                <h2 style="color: #408BF6; margin: 0 0 10px 0; font-size: 24px; font-weight: 600; text-align: center;">Forgot Password</h2>

                <p style="color: #5A6C7D; font-size: 15px; line-height: 1.5; margin: 0 0 20px 0; text-align: center;">
                  Welcome to COMMUNITY SERVICES! Please click the button below to forgot your account's password.
                </p>

                <div style="text-align: center;">
                  <a href="${link}" 
                    style="display: inline-block; background: #408BF6; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(64, 139, 246, 0.3);">
                    Forgot password
                  </a>
                </div>
              </td>
            </tr>

            <tr>
              <td style="background-color: #F8FAFC; padding: 15px; text-align: center; border-top: 1px solid #E2E8F0;">
                <p style="color: #94A3B8; font-size: 13px; margin: 0 0 5px 0;">
                  Need help? Contact our support team at 
                  <a href="mailto:support@lvpetroleum.com" style="color: #4A90E2; text-decoration: none;">support@lvpetroleum.com</a>
                </p>
                <p style="color: #CBD5E1; font-size: 11px; margin: 0;">
                  © 2024 COMMUNITY SERVICES. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>`
  };
};