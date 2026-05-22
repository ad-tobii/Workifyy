import brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';
dotenv.config();

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (receiverEmail, subject, text) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.sender = {
      name: 'Workifyy',
      email: process.env.BREVO_SENDER_EMAIL || 'noreply@workifyy.com',
    };
    sendSmtpEmail.to = [{ email: receiverEmail }];
    sendSmtpEmail.textContent = text;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('✅ Email sent successfully to:', receiverEmail);
  } catch (error) {
    console.error('❌ Email failed for:', receiverEmail);
    console.error('Error:', error.message || error);
    throw error;
  }
};

export default sendEmail;
