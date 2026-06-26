# 🚀 Preorder Manager Frontend

A modern frontend application for managing preorders, built with Next.js, TypeScript, Tailwind CSS, Shadcn UI, TanStack Form, and Sonner.

---

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* Shadcn UI
* TanStack Form
* Sonner
* Lucide React
* pnpm

---

## Prerequisites

Make sure the following are installed:

* Node.js v22.17.1 or later
* pnpm

Verify installation:

```bash
node -v
pnpm -v
```

---

## Clone the Repository

```bash
git clone https://github.com/ebny-buniad/preorder-manager-frontend.git
cd preorder-manager-frontend
```

---

## Install Dependencies

```bash
pnpm install
```

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## Backend Setup

This frontend requires the backend API to be running.

Start the backend application first:

```bash
cd preorder-manager-backend

pnpm install

pnpm dev
```

The backend should be available at:

```txt
http://localhost:5000
```

---

## Run the Frontend

Development mode:

```bash
pnpm dev
```

The application will start on:

```txt
http://localhost:3000
```

---

## Build for Production

Build the application:

```bash
pnpm build
```

Start the production build:

```bash
pnpm start
```

---

## Available Scripts

Start development server:

```bash
pnpm dev
```

Build the application:

```bash
pnpm build
```

Start production build:

```bash
pnpm start
```

Run ESLint:

```bash
pnpm lint
```

---

## Features

### Preorder Management

* Create Preorder
* Update Preorder
* Delete Preorder
* Toggle Status (Active / Inactive)

### Filtering

* View All Preorders
* View Active Preorders
* View Inactive Preorders

### Sorting

* Name
* Created Date
* Start Date
* End Date
* Ascending / Descending

### Pagination

* Server-side Pagination

### Validation & UX

* Zod Validation
* TanStack Form
* Toast Notifications
* Responsive UI

---

## Notes for Reviewers

1. Clone both frontend and backend repositories.
2. Install dependencies using `pnpm install`.
3. Create the `.env.local` file.
4. Start the backend server.
5. Start the frontend server.
6. Open `http://localhost:3000` in your browser.

The frontend communicates with the backend REST API and requires the backend service to be running locally.
