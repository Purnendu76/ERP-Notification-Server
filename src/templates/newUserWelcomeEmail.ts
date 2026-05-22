type NewUserEmailInput = {
  name: string;
  email: string;
  role: string;
  loginUrl: string;
  temporaryPassword?: string;
};

export function newUserWelcomeEmail({
  name,
  email,
  role,
  loginUrl,
  temporaryPassword,
}: NewUserEmailInput) {
  const subject = "Your Mini ERP account has been created";

  const text = `
Hello ${name},

Your Mini ERP account has been created.

Login Email: ${email}
Role: ${role}
${temporaryPassword ? `Temporary Password: ${temporaryPassword}` : ""}

Login here:
${loginUrl}

Please change your password after first login.

Regards,
Mini ERP Team
`;

  const html = `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;color:#0f172a;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr>
              <td style="background:#2563eb;padding:28px 32px;color:#ffffff;">
                <h1 style="margin:0;font-size:24px;">Welcome to Mini ERP</h1>
                <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">Your account has been created successfully.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:30px 32px;">
                <p style="margin:0 0 16px;font-size:16px;">Hello <strong>${name}</strong>,</p>

                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475569;">
                  Your Mini ERP account is now active. You can log in using the details below.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:14px;border:1px solid #e2e8f0;margin-bottom:24px;">
                  <tr>
                    <td style="padding:16px 18px;font-size:14px;color:#64748b;">Email</td>
                    <td style="padding:16px 18px;font-size:14px;text-align:right;"><strong>${email}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding:16px 18px;font-size:14px;color:#64748b;border-top:1px solid #e2e8f0;">Role</td>
                    <td style="padding:16px 18px;font-size:14px;text-align:right;border-top:1px solid #e2e8f0;"><strong>${role}</strong></td>
                  </tr>
                  ${
                    temporaryPassword
                      ? `
                  <tr>
                    <td style="padding:16px 18px;font-size:14px;color:#64748b;border-top:1px solid #e2e8f0;">Temporary Password</td>
                    <td style="padding:16px 18px;font-size:14px;text-align:right;border-top:1px solid #e2e8f0;"><strong>${temporaryPassword}</strong></td>
                  </tr>`
                      : ""
                  }
                </table>

                <a href="${loginUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:12px;font-weight:600;font-size:14px;">
                  Login to ERP
                </a>

                <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#64748b;">
                  For security, please change your password after first login.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;text-align:center;">
                Mini ERP Notification System
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  return {
    subject,
    text,
    html,
  };
}