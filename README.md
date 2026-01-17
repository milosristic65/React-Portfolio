# React Portfolio

This is my personal portfolio website built with React for the frontend and Express for the backend.

## Features

- Showcases my projects
- Contact form with email sending, from Node.js backend
- Rate limiting and basic security for the contact API
- Google reCAPTCHA bot protection
- Fetches data from Node.js backend

## Getting Started

### Prerequisites

- Node.js and npm installed

### Setup

#### 1. Install dependencies

Inside the root:
```bash
npm install
```

#### 2. Environment Variables

Create a `.env` file in the `server` folder:

```
# CORS
CORS_ORIGIN=https://frontend_url
# Contact
EMAIL=example@example.com
PASSWORD=email_password
# ReCAPTCHA
RECAPTCHA_SECRET=YOUR_RECAPTCHA_SECRET_KEY
```

Create a `.env` file in the `client` folder:

```
# Backend API
VITE_API_URL=https://backend_url
# reCAPTCHA public key
VITE_RECAPTCHA_SITE_KEY=recaptcha_site_key
```

#### 3. Build the app

# Inside the root
```bash
npm run build
```

#### 4. Run the app

```bash
npm start
```

#### Dev build

```bash
npm run dev
```

###### You can run these inside the root.

## Deployment

You can deploy the frontend and backend separately.
