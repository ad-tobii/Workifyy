import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (receiverEmail, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `"Workifyy" <${process.env.ZMAIL_USER}>`,
      to: receiverEmail,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to :' + receiverEmail);
  } catch (error) {
    console.log('❌ Email not sent to :' + receiverEmail);
    console.log(error.message);
  }
};

export default sendEmail;