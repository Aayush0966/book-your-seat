export const sendCodeMailOptions = (email: string, name: string, resetCode: number) => ({
  from: `"Book Your Seat" <${process.env.NEXT_PUBLIC_EMAIL}>`,
  to: email,
  subject: 'Reset Your Password - Book Your Seat',
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    :root {
    --primary: #3b82f6;
    --primary-dark: #2563eb;
    --secondary: #4f46e5;
    --dark: #1e293b;
    --light: #f8fafc;
    --gray: #64748b;
    }
    
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }
    
    body {
    font-family: 'Poppins', sans-serif;
    background-color: #f1f5f9;
    color: var(--dark);
    line-height: 1.6;
    }
    
    .container {
    max-width: 600px;
    margin: 30px auto;
    background: var(--light);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .header {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    padding: 30px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
    }
    
    .logo {
    margin-bottom: 15px;
    }
    
    .logo img {
    height: 50px;
    width: auto;
    }
    
    .header h1 {
    color: white;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 1px;
    margin: 0;
    text-transform: uppercase;
    }
    
    .header p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    margin-top: 5px;
    }
    
    .content {
    padding: 40px 30px;
    text-align: center;
    }
    
    .content h2 {
    font-size: 22px;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 15px;
    }
    
    .content p {
    font-size: 15px;
    color: var(--gray);
    max-width: 480px;
    margin: 0 auto 25px;
    }
    
    .reset-code {
    background: #f1f5f9;
    max-width: 300px;
    margin: 30px auto;
    padding: 20px;
    border-radius: 10px;
    border: 1px dashed rgba(99, 102, 241, 0.3);
    position: relative;
    }
    
    .reset-code::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: #f1f5f9;
    border-top: 1px dashed rgba(99, 102, 241, 0.3);
    border-left: 1px dashed rgba(99, 102, 241, 0.3);
    transform: translateX(-50%) rotate(45deg);
    }
    
    .reset-code p {
    font-size: 14px;
    margin-bottom: 10px;
    color: var(--gray);
    }
    
    .code {
    font-family: 'Courier New', monospace;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 5px;
    color: var(--dark);
    padding: 5px 10px;
    background: white;
    border-radius: 6px;
    display: inline-block;
    margin: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
    
    .expiry {
    font-size: 12px;
    color: var(--gray);
    margin-top: 10px;
    }
    
    .divider {
    height: 1px;
    background: #e2e8f0;
    margin: 30px 0;
    }
    
    .alternative {
    margin-top: 30px;
    }
    
    .alternative p {
    font-size: 14px;
    margin-bottom: 20px;
    }
    
    .cta-button {
    display: inline-block;
    padding: 14px 30px;
    background: linear-gradient(to right, var(--primary), var(--primary-dark));
    color: white;
    text-decoration: none;
    border-radius: 30px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
    }
    
    .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(79, 70, 229, 0.4);
    }
    
    .security-note {
    margin-top: 30px;
    padding: 15px;
    background: rgba(236, 253, 245, 0.6);
    border-radius: 8px;
    border-left: 3px solid #10b981;
    }
    
    .security-note p {
    font-size: 13px;
    color: #065f46;
    margin: 0;
    }
    
    .footer {
    background-color: #f1f5f9;
    padding: 20px;
    text-align: center;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .footer p {
    font-size: 12px;
    color: var(--gray);
    margin-bottom: 10px;
    }
    
    .footer a {
    color: var(--primary);
    text-decoration: none;
    }
    
    .support {
    margin-top: 15px;
    }
    
    .support p {
    font-size: 12px;
    color: var(--gray);
    }
    
    @media screen and (max-width: 500px) {
    .container {
      margin: 15px;
    }
    
    .content {
      padding: 30px 20px;
    }
    
    .code {
      font-size: 26px;
      letter-spacing: 3px;
    }
    }
  </style>
  </head>
  <body>
  <div class="container">
    <div class="header">
    <div class="logo">
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.82 22H4.18C2.97602 22 2 21.024 2 19.82V4.18C2 2.97602 2.97602 2 4.18 2H19.82C21.024 2 22 2.97602 22 4.18V19.82C22 21.024 21.024 22 19.82 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 8.5V15.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17 8.5V15.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 12H22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.5 22V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16.5 22V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <h1>Book Your Seat</h1>
    <p>Password Reset Request</p>
    </div>
    
    <div class="content">
    <h2>Reset Your Password</h2>
    <p>Hi ${name}, We received a request to reset the password for your Book Your Seat account. Enter the code below to reset your password.</p>
    
    <div class="reset-code">
      <p>Your password reset code:</p>
      <div class="code">${resetCode}</div>
      <p class="expiry">This code will expire in 30 minutes</p>
    </div>
    
    <div class="alternative">
      <p>Or click the button below to reset your password directly:</p>
      <a href="https://bookyourseat.vercel.app/reset-password?code=${resetCode}&email=${encodeURIComponent(email)}" class="cta-button">Reset Password</a>
    </div>
    
    <div class="security-note">
      <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns about your account security.</p>
    </div>
    </div>
    
    <div class="footer">
    <p>&copy; 2025 Book Your Seat. All rights reserved.</p>
    <p><a href="#">Terms of Service</a> · <a href="#">Privacy Policy</a></p>
    <div class="support">
      <p>Need help? Contact our support team at <a href="mailto:support@bookyourseat.com">support@bookyourseat.com</a></p>
    </div>
    </div>
  </div>
  </body>
  </html>`
  });
