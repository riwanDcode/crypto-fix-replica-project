# Deployment Guide for Crypto Fix Platform

This guide explains how to deploy both the frontend and backend components of the Crypto Fix Platform to production environments.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Access to a hosting provider for the frontend (e.g., Vercel, Netlify)
- Access to a server for the backend (e.g., Heroku, DigitalOcean, AWS)

## Frontend Deployment

### Option 1: Deploy with Vercel (Recommended)

1. Create an account on [Vercel](https://vercel.com) if you don't have one already.
2. Install the Vercel CLI:
   ```sh
   npm i -g vercel
   ```
3. From the project root directory, run:
   ```sh
   vercel
   ```
4. Follow the prompts to deploy your application.

### Option 2: Build and Deploy Manually

1. Create a production build:
   ```sh
   npm run build
   ```
2. The build output will be in the `dist` folder.
3. Upload the contents of the `dist` folder to your web hosting provider.

### Important Frontend Environment Variables

For production deployment, update the API endpoint in the `WalletConnectionModal.tsx` component:

```typescript
// Update from
const response = await fetch('/api/connect-wallet', {
  // ...
});

// To include your production API URL
const API_URL = import.meta.env.VITE_API_URL || '/api';
const response = await fetch(`${API_URL}/connect-wallet`, {
  // ...
});
```

Create a `.env.production` file with:
```
VITE_API_URL=https://your-backend-domain.com/api
```

## Backend Deployment

### Option 1: Deploy to Heroku

1. Create a Heroku account and install the Heroku CLI.
2. Create a new Heroku app:
   ```sh
   heroku create crypto-fix-backend
   ```
3. Set up environment variables:
   ```sh
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   heroku config:set NODE_ENV=production
   ```
4. Deploy the backend from the server directory:
   ```sh
   cd server
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a crypto-fix-backend
   git push heroku master
   ```

### Option 2: Deploy to DigitalOcean App Platform

1. Create an account on DigitalOcean.
2. Create a new App and connect it to your GitHub repository.
3. Configure the app to use the `server` directory as the source.
4. Set up environment variables in the DigitalOcean dashboard.
5. Deploy the application.

### Option 3: Deploy using Docker

1. Create a Dockerfile in the server directory:
   ```Dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   ENV NODE_ENV=production
   EXPOSE 3001
   CMD ["node", "server.js"]
   ```
2. Build and run the Docker image:
   ```sh
   docker build -t crypto-fix-backend .
   docker run -p 3001:3001 --env-file .env crypto-fix-backend
   ```

## CORS Configuration

When deploying the frontend and backend to different domains, update the CORS configuration in `server.js`:

```javascript
// Update CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
```

## Security Considerations

1. **Set proper environment variables** - Never commit sensitive information like email passwords to your repository.
2. **Enable CORS protection** - Limit CORS to only your frontend domain in production.
3. **Rate limiting** - Consider adding rate limiting to prevent abuse:

   ```sh
   npm install express-rate-limit
   ```

   ```javascript
   import rateLimit from 'express-rate-limit';

   const apiLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // Limit each IP to 100 requests per windowMs
     message: {
       success: false,
       message: 'Too many requests, please try again later.'
     }
   });

   // Apply to all API routes
   app.use('/api/', apiLimiter);
   ```

4. **Setup SSL/TLS** - Ensure your backend uses HTTPS for secure communication.
5. **Implement authentication** - For a production environment, add proper authentication mechanisms.

## Monitoring and Maintenance

1. Consider adding error tracking with services like Sentry.
2. Set up logging with tools like Winston or Pino.
3. Implement health checks for your backend service.
4. Create a backup strategy for any persistent data.

## CI/CD Integration

For continuous integration and deployment:

1. Create a GitHub Actions workflow in `.github/workflows/deploy.yml`
2. Set up separate workflows for frontend and backend deployment
3. Configure environment variables securely in your CI/CD system
