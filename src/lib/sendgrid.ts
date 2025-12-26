import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
}

export async function sendEmail(options: EmailOptions) {
  try {
    const msg = {
      to: options.to,
      from: options.from || process.env.SENDGRID_FROM_EMAIL || 'noreply@davidjayy.com',
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
      cc: options.cc,
      bcc: options.bcc,
    };

    const response = await sgMail.send(msg);
    console.log('Email sent successfully:', response[0].statusCode);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendOrderConfirmation(
  customerEmail: string,
  orderNumber: string,
  orderTotal: number,
  items: Array<{ title: string; price: number; license: string }>
) {
  const itemsHtml = items
    .map(
      item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.title}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.license}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Order Confirmed!</h1>
        <p style="margin: 10px 0 0 0;">Thank you for your purchase</p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px;">
        <h2 style="color: #1f2937; margin-top: 0;">Order Details</h2>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
        
        <h3 style="color: #1f2937; margin-top: 20px;">Items Purchased</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #e5e7eb;">
              <th style="padding: 10px; text-align: left;">Beat Title</th>
              <th style="padding: 10px; text-align: left;">License Type</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
          <p style="margin: 10px 0;"><strong>Total Amount:</strong> $${orderTotal.toFixed(2)}</p>
        </div>
        
        <h3 style="color: #1f2937; margin-top: 30px;">Next Steps</h3>
        <ol>
          <li>Check your account dashboard to download your beats</li>
          <li>Your licenses are ready to use immediately</li>
          <li>Keep this confirmation email for your records</li>
          <li>Contact support if you have any questions</li>
        </ol>
        
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          Best regards,<br/>
          David Jayy Beats Team
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `Order Confirmation - ${orderNumber}`,
    html,
  });
}

export async function sendDownloadLink(
  customerEmail: string,
  beatTitle: string,
  downloadUrl: string,
  expiresIn: string = '48 hours'
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Your Download is Ready!</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 20px;">
        <p>Hi,</p>
        <p>Your download for <strong>${beatTitle}</strong> is ready. Click the button below to download:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${downloadUrl}" style="background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
            Download Beat
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          <strong>Note:</strong> This link expires in ${expiresIn}. Download your files before they expire.
        </p>
        
        <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
          If you didn't request this download or have any issues, please contact our support team.<br/>
          Best regards,<br/>
          David Jayy Beats Team
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `Download: ${beatTitle}`,
    html,
  });
}

export async function sendWelcomeEmail(customerEmail: string, fullName: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Welcome to David Jayy Beats!</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 20px;">
        <p>Hi ${fullName},</p>
        <p>Welcome to our beat store! We're excited to have you here.</p>
        
        <h3 style="color: #1f2937;">Get Started</h3>
        <ul>
          <li><a href="${process.env.NEXT_PUBLIC_BASE_URL}/beats">Browse our beat catalog</a></li>
          <li><a href="${process.env.NEXT_PUBLIC_BASE_URL}/account">Complete your profile</a></li>
          <li><a href="${process.env.NEXT_PUBLIC_BASE_URL}/account#favorites">Save your favorite beats</a></li>
        </ul>
        
        <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
          Best regards,<br/>
          David Jayy Beats Team
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject: 'Welcome to David Jayy Beats!',
    html,
  });
}

export async function sendPasswordReset(
  customerEmail: string,
  resetToken: string,
  expiresIn: string = '1 hour'
) {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Reset Your Password</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 20px;">
        <p>We received a request to reset your password. Click the link below to create a new password:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
            Reset Password
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          <strong>Note:</strong> This link expires in ${expiresIn}. If you didn't request this, you can safely ignore this email.
        </p>
        
        <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
          Best regards,<br/>
          David Jayy Beats Team
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject: 'Reset Your Password',
    html,
  });
}
