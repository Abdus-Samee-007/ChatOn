# ChatOn

A full stack chat application which lets you chat real-time privately with others and has features such as media upload and saved chat history.
Also has custom profile options such as choosing your preferred theme across the app or choosing your own profile photo.

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

## Tech Stack

- **Frontend:** React, Vite, Zustand, Tailwind CSS, DaisyUI, React Router, Socket.IO Client
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO, Cloudinary, JWT, bcryptjs

---

## Setup

### 1. Clone the repository

```sh
git clone https://github.com/Abdus-Samee-007/ChatOn
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
## License

MIT

---
