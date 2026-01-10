# React Portfolio

This is my personal portfolio website built with React for the frontend and Express for the backend.

## Features

- Showcases my projects
- Contact form with email sending (Node.js backend)
- Rate limiting and basic security for the contact API

## Getting Started

### Prerequisites

- Node.js and npm installed

### Setup

#### 1. Install dependencies

For the frontend:
```bash
cd client
npm install
```

For the backend:
```bash
cd ../server
npm install
```

#### 2. Environment Variables

Create a `.env` file in the `server` folder with your email credentials:

```
EMAIL=your_email@gmail.com
PASSWORD=your_email_password
PORT=5000
```

#### 3. Run the app

Start the backend:
```bash
cd server
npm start
```

Start the frontend:
```bash
cd ../client
npm start
```

## Deployment

You can deploy the frontend and backend separately.
