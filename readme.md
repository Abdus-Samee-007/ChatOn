# ChatOn

A full-stack real-time chat application built with React, Vite, Zustand, Tailwind CSS (frontend) and Node.js, Express, MongoDB, Socket.IO (backend).

---

## Features

- User authentication (signup, login, logout)
- Real-time messaging with Socket.IO
- Profile management with image upload (Cloudinary)
- Responsive UI with Tailwind CSS & DaisyUI
- Theme switching (light/dark)
- Online users indicator

---

## Folder Structure

```
ChatOn/
├── backend/
│   ├── src/
│   ├── .env.sample
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── package.json
└── README.md
```

---

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB database (local or Atlas)
- Cloudinary account (for image uploads)

---

## Setup

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/ChatOn.git
cd ChatOn
```

### 2. Backend Setup

```sh
cd backend
cp .env.sample .env
# Fill in your MongoDB URI, JWT secret, Cloudinary credentials in .env
npm install
npm run dev
```

- The backend runs on `http://localhost:5000` by default.

### 3. Frontend Setup

Open a new terminal:

```sh
cd frontend
npm install
npm run dev
```

- The frontend runs on `http://localhost:5173` by default.

---

## Environment Variables

See [`backend/.env.sample`](backend/.env.sample) for required backend environment variables.

---

## Build for Production

To build the frontend for production:

```sh
cd frontend
npm run build
```

To start the backend in production mode:

```sh
cd backend
npm run start
```

---

## Scripts

From the root folder, you can use:

- `npm run build` &mdash; Installs dependencies and builds the frontend
- `npm run start` &mdash; Starts the backend server

---

## Tech Stack

- **Frontend:** React, Vite, Zustand, Tailwind CSS, DaisyUI, React Router, Socket.IO Client
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO, Cloudinary, JWT, bcryptjs

---

## License

MIT

---

## Credits

Made by [Your Name](https://github.com/abdus-samee-007)