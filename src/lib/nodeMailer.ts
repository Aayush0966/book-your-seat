import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface MailOptions {
    from : string,
    to : string,
    subject: string,
    html: string,
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// All outgoing mail is redirected to this single inbox. The recipient passed in
// by callers is ignored on purpose so we never email real users.
const getRecipient = (): string => {
    const recipient = process.env.MY_EMAIL;
    if (!recipient) {
        throw new Error('MY_EMAIL is not configured');
    }
    return recipient;
};

export const sendOTP = async (email: string, otp: number): Promise<void> => {
    const mailOptions = {
        from: `"Book Your Seat" <${process.env.EMAIL}>`, 
        to: getRecipient(),
        subject: 'Your OTP Code',
        html: `
            <div style="font-family: Arial, sans-serif; text-align: center; max-width: 400px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px;">
                <h2 style="color: #4CAF50;">Your OTP Code</h2>
                <p style="font-size: 16px; color: #555;">
                    Use the OTP below to proceed with your action. The OTP is valid for <strong>10 minutes</strong>.
                </p>
                <div style="margin: 20px auto; font-size: 24px; font-weight: bold; color: #333; border: 1px dashed #4CAF50; padding: 10px;">
                    ${otp}
                </div>
                <p style="font-size: 14px; color: #888;">If you didn’t request this, please ignore this email.</p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};

export const sendWelcomeEmail = async (welcomeMailOptions: MailOptions) => {
    try {
        const info = await transporter.sendMail({ ...welcomeMailOptions, to: getRecipient() });
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false
    }
}

export const sendForgetPasswordCode = async (codeMailOptions: MailOptions) => {
    try {
        const info = await transporter.sendMail({ ...codeMailOptions, to: getRecipient() });
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
}