import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (receiverEmail, subject, text) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Workifyy <noreply@workifyy.com>',
      to: receiverEmail,
      subject,
      text,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ Email sent successfully to:', receiverEmail);
  } catch (error) {
    console.error('❌ Email failed for:', receiverEmail);
    console.error('Error:', error.message);
    throw error;
  }
};

export default sendEmail;