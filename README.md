# SCSDB.

A beautiful, responsive **Movie Database (Frontend)** built with React.  
A TMDB-style UI with purple/dark theme, sidebar navigation, trending carousel, movie details, trailers and search.

![SCSDB Screenshot](./screenshots/homepage.png)

---

## 🚀 Features

- Clean, dark & purple themed UI inspired by SCSDB design
- Browse Trending / Popular movies and TV shows
- Search movies, shows, and people
- Movie / TV detail pages with overview, cast, crew and watch providers
- Trailer modal (YouTube) support
- Responsive layout (desktop, tablet, mobile)
- Lazy loading and skeleton placeholders for better UX
- State management with Redux (or Context API option)
- Uses TMDB API (or any movie DB API) for data

---

## 🧰 Tech Stack

- **React** (Create React App / Vite)
- **Redux** (redux-toolkit) or React Context
- **React Router** for navigation
- **Axios** or Fetch for API calls
- **Tailwind CSS** (recommended) / SCSS for styling
- **Framer Motion** for subtle animations (optional)
- **React Player** or embedded YouTube for trailers

---

## 🔧 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- TMDB API key (or your movie DB API)

### Setup
1. Clone the repo
   ```bash
   git clone https://github.com/<your-username>/scsdb-movie-app.git
   cd scsdb-movie-app

##Folder Structure
scsdb-movie-app/
├─ public/
│  └─ index.html
├─ src/
│  ├─ api/
│  │  └─ tmdb.js
│  ├─ assets/
│  │  ├─ logo.svg
│  │  └─ images/
│  ├─ components/
│  │  ├─ Header/
│  │  ├─ Sidebar/
│  │  ├─ MovieCard/
│  │  ├─ HorizontalCards/
│  │  └─ Loading/
│  ├─ pages/
│  │  ├─ Home/
│  │  ├─ Movies/
│  │  ├─ TvShows/
│  │  ├─ People/
│  │  └─ MovieDetails/
│  ├─ store/               # redux-toolkit slices, actions
│  ├─ hooks/
│  ├─ utils/
│  ├─ styles/
│  ├─ App.jsx
│  ├─ index.jsx
│  └─ routes.jsx
├─ .env.example
├─ package.json
└─ README.md
