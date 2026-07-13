import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM;

const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Merkato Store</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td align="center" style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%);border-radius:16px 16px 0 0;padding:36px 40px 28px;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Merkato Store</h1>
            <p style="margin:6px 0 0;color:#f0a500;font-size:13px;font-weight:500;letter-spacing:0.5px;">YOUR PREMIUM MARKETPLACE</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;padding:40px 40px 32px;">
            ${content}
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="background:#f9f9fb;border-top:1px solid #ebebef;border-radius:0 0 16px 16px;padding:24px 40px;">
            <p style="margin:0 0 6px;color:#9ca3af;font-size:12px;">You received this email because you signed up at Merkato Store.</p>
            <p style="margin:0;color:#9ca3af;font-size:12px;">If you didn't request this, you can safely ignore this email.</p>
            <p style="margin:16px 0 0;color:#d1d5db;font-size:11px;">&copy; ${new Date().getFullYear()} Merkato Store. All rights reserved.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

const resetTemplate = (url) => baseTemplate(`
  <div style="text-align:center;margin-bottom:28px;">
    <div style="display:inline-block;background:#fef2f2;border:2px solid #ef4444;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:28px;">🔒</div>
  </div>
  <h2 style="margin:0 0 10px;color:#111827;font-size:22px;font-weight:700;text-align:center;">Reset your password</h2>
  <p style="margin:0 0 28px;color:#6b7280;font-size:15px;line-height:1.6;text-align:center;">
    We received a request to reset your Merkato Store password. Click the button below to choose a new one.
  </p>
  <div style="text-align:center;margin-bottom:28px;">
    <a href="${url}" style="display:inline-block;background:#f0a500;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;letter-spacing:0.3px;">Reset Password</a>
  </div>
  <p style="margin:0 0 8px;color:#9ca3af;font-size:13px;text-align:center;">Or copy and paste this link into your browser:</p>
  <p style="margin:0;background:#f4f4f7;border-radius:8px;padding:10px 14px;font-size:12px;color:#6b7280;word-break:break-all;text-align:center;">${url}</p>
  <div style="margin:28px 0 0;padding:16px;background:#fef2f2;border-left:4px solid #ef4444;border-radius:0 8px 8px 0;">
    <p style="margin:0;color:#991b1b;font-size:13px;">⏰ This link expires in <strong>1 hour</strong>. If you didn't request this, ignore this email.</p>
  </div>
`);

export async function sendPasswordResetEmail(to, token) {
    const url = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    await resend.emails.send({
        from: FROM,
        to,
        subject: '🔒 Reset your Merkato Store password',
        html: resetTemplate(url),
    });
}
