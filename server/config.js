// This file contains configuration for environment variables
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.warn('\x1b[33m%s\x1b[0m', 'Warning: .env file not found! Please create one using the .env.example template.');
}

dotenv.config();

// Required environment variables
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', `Error: Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.log('Please create or update your .env file with the required variables.');
}

const config = {
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  recipient: process.env.RECIPIENT_EMAIL || 'fredrickbolutife@gmail.com',
  port: process.env.PORT || 3001,
  production: process.env.NODE_ENV === 'production',
  adminApiKey: process.env.ADMIN_API_KEY || 'development_admin_key',
  allowedOrigins: process.env.ALLOWED_ORIGINS || 'http://localhost:8080',
  logLevel: process.env.LOG_LEVEL || 'info',
  appName: 'Crypto Fix Platform',
  version: '1.0.0'
};

// Log configuration at startup (excluding sensitive values)
console.log('Server configuration loaded:');
console.log(`- Environment: ${config.production ? 'Production' : 'Development'}`);
console.log(`- Port: ${config.port}`);
console.log(`- Email configured: ${!!config.emailUser && !!config.emailPass}`);
console.log(`- Allowed origins: ${config.production ? config.allowedOrigins : 'All (CORS disabled in development)'}`);

export default config;
