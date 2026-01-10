# Express Server

This is a simple Express.js server for handling backend API requests.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file in this directory with your environment variables (see below).

## Environment Variables

- `EMAIL` - The email address used for sending emails
- `PASSWORD` - The password or app password for the email account
- `PORT` - (Optional) The port the server will run on (default: 5000)

Example `.env`:
```
EMAIL=your_email@gmail.com
PASSWORD=your_email_password
PORT=5000
```

## Running the Server

```
npm start
```

The server will start on the port specified in your `.env` file or default to 5000.

## API Endpoints

- `POST /api/contact` - Send a contact form email
