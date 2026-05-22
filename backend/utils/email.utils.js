import { BrevoClient } from '@getbrevo/brevo';
import dotenv from 'dotenv';
dotenv.config();

const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

const sendEmail = async (receiverEmail, subject, text) => {
  try {
    await brevo.transactionalEmails.sendTransacEmail({
      subject,
      textContent: text,
      sender: {
        name: 'Workifyy',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@workifyy.com',
      },
      to: [{ email: receiverEmail }],
    });
    console.log('✅ Email sent successfully to:', receiverEmail);
  } catch (error) {
    console.error('❌ Email failed for:', receiverEmail);
    console.error('Error:', error.message || error);
    throw error;
  }
};

export default sendEmail;
