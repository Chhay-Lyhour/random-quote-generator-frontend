# Random Quote Generator

## Frontend

### By Chhay Lyhour

#### A simple full-stack application that displays random quotes and allows users to add new ones. This project was built to practice integrating a separate frontend, backend, and database.

## Tech Stack

UX/UI: Figma
Frontend: Next.js, Tailwind CSS, TypeScript, Shadcn UI
Backend: NestJS, TypeScript
Database: Neon (PostgreSQL) with Drizzle ORM

## Features

Generate a random quote with the click of a button.
View all available quotes.
Submit a new quote to the database.

## Setup and Installation

To run this project locally, you'll need to set up both the backend and frontend services.

### 1. Backend Setup

First, navigate to the [backend repository](https://github.com/Chhay-Lyhour/random-quote-generator-backend.git) and follow the setup instructions in its README file. Ensure the backend server is running before proceeding.

### 2. Frontend Setup

Once the backend is live, you can start the frontend:
Clone the repository:

```Bash
git clone https://github.com/Chhay-Lyhour/random-quote-generator-frontend.git
```

Navigate to the project directory and install dependencies:

```Bash
cd random-quote-generator-frontend.git
npm install
```

Start the development server:

```Bash
npm run dev
```

Open the application:
Launch your browser and go to http://localhost:3000 to see the app in action.

## Architecture Overview

The application is architecturally separated into a Next.js frontend and a NestJS backend, which handles database interactions.

### Frontend (Next.js):

- Built with the App Router, with the main layout defined in src/app/layout.tsx.
- The homepage (/) renders the QuoteGenerator component, which fetches a random quote from the backend's /quotes/get-random endpoint.
- All API calls are managed through helper functions in src/lib/utils.ts, which use the native fetch API for client-side data fetching and mutations.

### Backend (NestJS):

- Provides a REST API for the frontend to consume.
- Key endpoints include GET /quotes/get-random for a single random quote and POST /quotes to create a new quote.
