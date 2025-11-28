# MERN Blog Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application with modern UI, dark/light theme support, and comprehensive CRUD operations.

## 🚀 Features

- **Blog Management**: Create, read, update, and delete blog posts
- **User Authentication**: JWT-based registration and login
- **Categories**: Organize posts by categories
- **Comments System**: Interactive comments on blog posts
- **Image Uploads**: Featured images for posts
- **Dark/Light Theme**: Toggle between themes with smooth animations
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Railway, Render, Vercel

## 📁 Project Structure

```
mern-blog-engine-main/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   └── services/       # API services
│   ├── public/             # Static assets
│   └── dist/               # Built files (generated)
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── uploads/            # Uploaded files
├── railway.json           # Railway deployment config
├── render.yaml            # Render deployment config
├── vercel.json            # Vercel deployment config
└── package.json           # Root package.json for deployments
```

## 🚀 Local Development

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mern-blog-engine-main
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   cd ..
   ```

4. **Environment Setup**

   - Copy `server/.env.example` to `server/.env`
   - Update MongoDB connection string and JWT secret
   - Copy `client/.env.example` to `client/.env` (if needed)

5. **Start Development Servers**

   ```bash
   # Terminal 1: Start server
   cd server
   npm run dev

   # Terminal 2: Start client
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🚀 Production Deployment

Choose from three deployment platforms:

### Option 1: Railway (Full-Stack - Recommended)

1. **Create Railway Account**
   - Sign up at [railway.app](https://railway.app)

2. **Connect Repository**
   - Link your GitHub repository to Railway
   - Railway automatically detects `railway.json` configuration

3. **Environment Variables**
   Add these in Railway dashboard:
   ```
   DATABASE_URL=mongodb+srv://your-mongodb-connection-string
   JWT_SECRET=your-secure-jwt-secret-here
   NODE_ENV=production
   ```

4. **Deploy**
   - Push to main branch triggers automatic deployment
   - Railway builds and deploys both frontend and backend

### Option 2: Render (Full-Stack)

1. **Create Render Account**
   - Sign up at [render.com](https://render.com)

2. **Connect Repository**
   - Create new "Web Service" from Git
   - Connect your GitHub repository
   - Render detects `render.yaml` configuration

3. **Environment Variables**
   Add these in Render dashboard:
   ```
   DATABASE_URL=mongodb+srv://your-mongodb-connection-string
   JWT_SECRET=your-secure-jwt-secret-here
   NODE_ENV=production
   ```

4. **Deploy**
   - Render automatically builds and deploys
   - Both frontend and backend served from single service

### Option 3: Vercel + Render (Frontend + Backend)

#### Frontend on Vercel:
1. **Create Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)

2. **Connect Repository**
   - Import your GitHub repository
   - Vercel detects `vercel.json` configuration

3. **Environment Variables**
   Add in Vercel dashboard:
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com/api
   ```

4. **Deploy**
   - Vercel builds and deploys the React frontend
   - Automatically connects to your Render backend

#### Backend on Render:
1. **Deploy backend separately** using Option 2 above
2. **Note the Render URL** (e.g., `https://your-app.onrender.com`)
3. **Update Vercel** with the backend URL

### Environment Variables Summary

**Backend (Railway/Render):**
```
DATABASE_URL=mongodb+srv://your-mongodb-connection-string
JWT_SECRET=your-secure-jwt-secret-here
NODE_ENV=production
```

**Frontend (Vercel only):**
```
VITE_API_URL=https://your-backend-url/api
```

### Database Setup

**MongoDB Atlas (Recommended for all platforms):**
1. Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Whitelist IP: `0.0.0.0/0` for cloud deployments

## 📡 API Endpoints

### Posts

- `GET /api/posts` - Get all posts (with pagination, search, filtering)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)
- `POST /api/posts/:id/comments` - Add comment to post (auth required)

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (auth required)

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## 🔧 Configuration

### Environment Variables

**Server (.env)**

```
MONGO_URI=mongodb://localhost:27017/mern_blog
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

**Client (.env)**

```
VITE_API_URL=http://localhost:5000/api
```

## 🎨 UI Components

Built with modern React patterns and shadcn/ui:

- Responsive navigation with mobile menu
- Theme toggle (dark/light/system)
- Form validation with React Hook Form
- Toast notifications
- Loading states and error handling

## 📱 Features Overview

- **Blog Posts**: Rich text content with featured images
- **User Management**: Secure authentication system
- **Content Management**: Full CRUD operations for posts
- **Image Handling**: Upload and display featured images
- **Responsive Design**: Works on all device sizes
- **Modern UX**: Smooth animations and transitions

## 📸 Screenshots

### Homepage with Animated Hero

![Homepage](screenshots/01-homepage.png)
_Animated hero section with floating elements, gradient text, and blog posts grid_

### Authentication Page

![Authentication](screenshots/02-authentication.png)
_Modern glassmorphism design with animated backgrounds and smooth transitions_

### Create Post Form

![Create Post](screenshots/03-create-post.png)
_Comprehensive post creation form with image upload, category selection, and rich text editing_

### Individual Post View

![Post Detail](screenshots/04-post-detail.png)
_Full post display with featured image, author info, and interactive comments section_

### Search & Filter Functionality

![Search & Filter](screenshots/05-search-filter.png)
_Advanced search and filtering system with real-time results and multiple sort options_

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Happy coding! 🎉**
