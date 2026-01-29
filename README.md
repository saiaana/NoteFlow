# NoteFlow

Full-stack web application for managing notes, built with Next.js 15, React 19, Node.js, Express, and MongoDB.

## 📖 Description

NoteFlow is a full-featured application for creating, editing, and organizing notes. The application supports user authentication, tags, search, sorting, and many other features for convenient note management.

## ✨ Key Features

- 🔐 **Authentication** — user registration and login
- 📝 **Note Management** — create, edit, and delete notes
- 🏷️ **Tags** — organize notes with tags
- 🔍 **Search** — full-text search across titles and content
- 📊 **Sorting** — sort notes by creation date
- 📱 **Responsive Design** — optimized for various devices
- 🎨 **Modern UI** — beautiful and intuitive interface

## 🚀 Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** — React framework with App Router
- **[React 19](https://react.dev/)** — UI library
- **[TypeScript](https://www.typescriptlang.org/)** — type-safe JavaScript
- **[Material-UI (MUI)](https://mui.com/)** — React component library
- **[Chakra UI](https://chakra-ui.com/)** — UI component library
- **[Zustand](https://github.com/pmndrs/zustand)** — lightweight state management
- **[Framer Motion](https://www.framer.com/motion/)** — animation library
- **[Tailwind CSS](https://tailwindcss.com/)** — utility-first CSS framework

### Backend
- **Node.js** — JavaScript runtime
- **Express** — Web framework
- **MongoDB** — Database (via Mongoose)
- **JWT** — Authentication
- **bcryptjs** — Password hashing
- **CORS** — Cross-origin resource sharing

## 📋 Requirements

- **Node.js** 18 or higher
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB instance)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd NoteFlow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Backend

Create `backend/config.env` file:

```env
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

DATABASE=mongodb+srv://username:<PASSWORD>@cluster.mongodb.net/database?retryWrites=true&w=majority
DATABASE_PASSWORD=your-database-password

JWT_SECRET=your-long-and-secure-secret-string-minimum-32-characters
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

ALLOWED_ORIGINS=http://localhost:3001
```

> **Important:** Never commit `config.env` to version control. Use `backend/config.env.example` as a template.

### 4. Configure Frontend (Optional for development)

Create `frontend/.env.local` file (optional for local development):

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

> **Note:** For local development, the API URL is automatically determined. For production deployment, you **must** set `NEXT_PUBLIC_API_BASE_URL` with your backend server URL.

## 🏃 Running

### Development Mode

#### Start Backend

```bash
npm run dev
```

Backend will run on [http://localhost:3000](http://localhost:3000)

#### Start Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on [http://localhost:3001](http://localhost:3001)

### Production Build

#### Backend

```bash
npm start
```

Or specifically:

```bash
npm run start:backend
```

#### Frontend

```bash
cd frontend
npm run build
npm start
```

## 📁 Project Structure

```
NoteFlow/
├── backend/                 # Backend API server
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/              # Express routes
│   ├── utils/               # Utility functions
│   ├── app.js               # Express app configuration
│   ├── server.js            # Server entry point
│   └── config.env           # Environment variables (not in git)
├── frontend/                # Frontend Next.js application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and API clients
│   │   ├── store/           # Zustand stores
│   │   ├── types/            # TypeScript types
│   │   └── styles/           # Styles and themes
│   └── public/              # Static files
├── shared/                  # Shared code between frontend and backend
└── package.json             # Root package.json
```

## 🔧 Environment Variables

### Backend Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment (development/production) | No | `development` |
| `PORT` | Server port | No | `3000` |
| `HOST` | Server host | No | `0.0.0.0` |
| `DATABASE` | MongoDB connection string with `<PASSWORD>` placeholder | Yes | - |
| `DATABASE_PASSWORD` | MongoDB password | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `JWT_EXPIRES_IN` | JWT token expiration time | No | `90d` |
| `JWT_COOKIE_EXPIRES_IN` | Cookie expiration in days | No | `90` |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins | Yes (production) | - |

### Frontend Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | Yes (production) | `http://localhost:3000` (development only) |

## 📝 Available Scripts

### Root Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend in development mode (nodemon) |
| `npm start` | Start backend in production mode |
| `npm run start:backend` | Start backend specifically |

### Frontend Scripts

| Command | Description |
|---------|-------------|
| `cd frontend && npm run dev` | Start development server on port 3001 |
| `cd frontend && npm run build` | Build production version |
| `cd frontend && npm start` | Start production server |
| `cd frontend && npm run lint` | Run ESLint linter |

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/users/signup` - Register new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user
- `GET /api/v1/users/checkAuth` - Check authentication status
- `POST /api/v1/users/demoLogin` - Demo user login

### Notes
- `GET /api/v1/notes` - Get all notes (paginated)
- `GET /api/v1/notes/:id` - Get single note
- `POST /api/v1/notes` - Create note
- `PATCH /api/v1/notes/:id` - Update note
- `DELETE /api/v1/notes/:id` - Delete note
- `GET /api/v1/notes/search` - Search notes
- `GET /api/v1/notes/byTag` - Get notes by tag

## 🏗️ Architecture

### Frontend Architecture

#### State Management
The application uses **Zustand** for state management:
- **`useAuthStore`** — manages authentication state
- **`useNotesStore`** — manages notes state (list, search, sorting)
- **`useModalStore`** — manages modal dialogs

#### API Integration
All API requests are centralized in the `lib/api/` module:
- `authService.ts` — authentication services
- `notesApi.ts` — note-related services
- `config.ts` — API configuration (URL, settings)

#### Routing
The application uses Next.js App Router with the following main routes:
- `/` — home page
- `/login` — login page
- `/signup` — registration page
- `/notes` — list of all notes
- `/notes/[noteId]` — view individual note
- `/notes/notes-by-tag/[tag]` — notes by tag
- `/new-note` — create new note
- `/edit-note/[noteId]` — edit note

### Backend Architecture

#### Security
- **CORS Configuration:**
  - Development: Allows all origins (`origin: true`)
  - Production: Uses `ALLOWED_ORIGINS` environment variable to restrict access
- **Authentication:**
  - JWT tokens stored in HTTP-only cookies
  - Password hashing with bcryptjs
  - Token expiration and validation
