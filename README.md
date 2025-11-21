# 🎧 DJS Portfolio Piece – Podcast App (React)

The Podcast App is a feature-rich podcast browsing and listening platform.
Users can search shows, filter by genre, sort by various criteria, explore recommended shows via a carousel, view detailed podcast seasons and episodes, listen through a global audio player, and save favourite episodes — all with a responsive, theme-toggle UI.

 Live Demo

🔗 https://chegor-25091-pto-2502-group-a-chels.vercel.app/
    Local Host: http://localhost:5173/

## The app was built with:

- User experience at the center

- Clean UI

- Smooth audio playback

- Persistent data (theme, favourites, listening history)

- Stable navigation & deployment support (Vercel routes fix)

## Key Features

- **Routing (React Router DOM)**  
  Uses `react-router-dom` for navigation between pages:

  - `/` – Home page with search, filters, sorting, and pagination
  - `/show/:id` – Detailed view of a selected podcast, including episode listing

- **Podcast Context (Global State)**  
  Provides shared state using `PodcastContext`:

  - Manages full podcast dataset, filters, search, sort, pagination
  - Makes data accessible across pages

- **Search**

  - Case-insensitive search by podcast title
  - Updates results dynamically

- **Sort Options**

  - Default
  - Newest
  - Oldest
  - Title A → Z
  - Title Z → A

- **Genre Filter**

  - Filters podcasts by genre
  - Genre data loaded from static source

- **Pagination**

  - Dynamic per-page item calculation based on screen size
  - Defaults to 10 per page on smaller screens

- **Detail View**
  - Fetches full podcast data when visiting `/show/:id`
  - Displays title, image, description, genre tags, and seasons

- **Light & Dark Theme**

 - Toggle between themes using an elegant switch

 - Theme persists using localStorage

 - All components adapt seamlessly through CSS variables

 - Icons update based on the selected mode

 - Recommended Carousel

 - Custom-built carousel

 - Loops infinitely

 - **Each card shows**

 - Image

 - Title

 - Genre tags

 - Clicking a show opens the Show Details page

 - Navigation arrows moved to outside spacing for clean UI

 - **Show Details Page**

 - For each show:

 - Show description

 - Season list

 - Episode breakdown

 - Episode cards with:

 - Title

 - Description

 - Season image

 - Play button

 - Favourite toggle (heart icon)

 - Favourites System

 - Save episodes using a heart icon

- Heart turns dark blue when favourited

- Saves episode metadata, including:

 - Added date

 - Show title

- Episode number

 - Season number



 - **Audio Player (Global & Persistent)**

 - A fully custom-built player at the bottom of the screen:

 - Always visible

 - Plays placeholder audio (SoundHelix example)

- Shows:

 - Episode title

 - Show name

 - Progress slider

- Play/pause toggle

 - Audio continues between pages

 - Progress saves for each episode

 - Episode resumes from where you left off

- **Listening History Features**

 - Saves:

 - last listened position

 - duration

 - whether the episode was finished

 - Marks episode as "finished"

 - Saves listening state in LocalStorage

 - Reset function for clearing history

 - Warns user before closing tab while audio plays

 - Responsive & Accessible

 - Mobile-first styling

 - Works on all modern devices

 - Cards resize gracefully

 - Search + filters stack on smaller screens



## Project Structure

```
 DJSPP/
│
├── public/
│   └── img/
│       └── Favicon.png            # App favicon used for browser tab + social previews
│
├── src/
│   ├── api/
│   │   └── fetchPata.js           # API utility: fetch all podcasts & single podcast data
│
│   ├── components/
│   │
│   │   ├── Filters/               # ---- SEARCH / FILTER / SORT COMPONENTS ----
│   │   │   ├── GenreFilter.jsx    # Genre filtering dropdown
│   │   │   ├── GenreFilter.module.css
│   │   │   ├── SearchBar.jsx      # Search input component
│   │   │   ├── SearchBar.module.css
│   │   │   ├── SortSelect.jsx     # Sort by newest / oldest
│   │   │   ├── SortSelect.module.css
│   │   │   └── index.js           # Barrel file for quick exporting
│   │
│   │   ├── Podcasts/              # ---- MAIN PODCAST DISPLAY COMPONENTS ----
│   │   │   ├── EpisodeCard.jsx          # Episode UI card + favourite button + play button
│   │   │   ├── EpisodeCard.module.css
│   │   │   ├── PodcastCard.jsx         # Show card used on main grid
│   │   │   ├── PodcastCard.module.css
│   │   │   ├── PodcastDetails.jsx      # Episode listing inside a single show page
│   │   │   ├── PodcastDetails.module.css
│   │   │   ├── PodcastGrid.jsx         # Main home page show grid
│   │   │   ├── PodcastGrid.module.css
│   │   │   └── index.js                # Barrel file for exports
│   │
│   │   ├── UI/                    # ---- SHARED COMPONENTS / UI ELEMENTS ----
│   │   │   ├── AudioPlayer.jsx         # Sticky bottom media player
│   │   │   ├── AudioPlayer.module.css
│   │   │   ├── Carousel.jsx            # Custom looping carousel
│   │   │   ├── Carousel.module.css
│   │   │   ├── Error.jsx               # Error message component
│   │   │   ├── Error.module.css
│   │   │   ├── GenreTags.jsx           # Mini tag bubbles used on cards
│   │   │   ├── GenreTags.module.css
│   │   │   ├── Header.jsx              # Logo + navigation + theme toggle
│   │   │   ├── Header.module.css
│   │   │   ├── LightDarkMode.jsx       # Theme toggle switch
│   │   │   ├── LightDarkMode.module.css
│   │   │   ├── Loading.jsx             # Loading spinner
│   │   │   ├── Loading.module.css
│   │   │   ├── Pagination.jsx          # Pagination controls
│   │   │   ├── Pagination.module.css
│   │   │   ├── index.js                # Barrel file
│   │   │
│   ├── context/                # ---- GLOBAL STATE PROVIDERS ----
│   │   ├── AudioContext.jsx         # Persistent audio playback + progress tracking
│   │   ├── FaveContext.jsx          # Favourites system + localStorage sync
│   │   └── PodcastContext.jsx       # Fetch + store all podcasts
│
│   ├── pages/                 # ---- PAGE ROUTES ----
│   │   ├── FavePage.jsx             # Favourites page (grouping, sorting)
│   │   ├── FavePage.module.css
│   │   ├── Home.jsx                 # Homepage (search + filters + carousel + grid)
│   │   ├── Home.module.css
│   │   ├── ShowDetail.jsx           # Individual podcast show detail page
│   │   └── ShowDetail.module.css
│
│   ├── utils/
│   │   ├── App.jsx                # Routing + layout wrapper (Header + AudioPlayer)
│   │   ├── data.js                # Genre list & static data
│   │   ├── index.css              # Global styling, theme variables
│   │   └── main.jsx               # React DOM entry point
│
├── .gitignore
├── eslint.config.js              # Linting rules
├── index.html                    # Root HTML + meta tags + favicon
├── package.json
├── README.md
├── vercel.json                   # Fix for Vercel routing refresh issue
└── vite.config.js                # Vite setup + path aliasing
```

## How It Works

- User opens app

- Podcasts load → UI updates

-  User searches / filters / sorts

- Home page shows results instantly

-  User clicks on a show

- Show details load → seasons + episodes visible

-  User presses Play

- Audio player slides up → playback starts
  Progress saved live in localStorage

 - User navigates

- Audio keeps playing across pages

-  User hearts an episode

- Saved in localStorage → appears in Favourites

-  User changes theme

- UI updates → preference saved permanently

## How to Run

1. Clone the repo or download the project files.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```
    npm run dev
   ```
4. Visit http://localhost:5173 in your browser.

## Tech Stack

- React (Hooks + Context API)

- React Router

- Vite

- CSS Modules

- CSS Variables (Light/Dark theme)

- LocalStorage (Favourites, Theme, Listening History)

- Netlify Podcast API (Data source)

- Vercel (Deployment)


## Future Enhancements

- Use real audio URLs when available

- Add episode searching/sorting

- Download episodes for offline listening

- Add podcast recommendations based on history

- Animate theme transitions

- Add user accounts + cloud sync
