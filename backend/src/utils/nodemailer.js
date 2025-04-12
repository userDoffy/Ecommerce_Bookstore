import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: '8a34a9001@smtp-brevo.com',
        pass: 'Wq3RBtwSGCrjn41T',
    }
});

export const sendOtpEmail = async (to, otp) => {
    await transporter.sendMail({
        from: 'adhungana09@gmail.com',
        to,
        subject: 'Your OTP for Email Verification',
        html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`
    });
};

export default transporter