![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-green)

# MyGameList

MyGameList is a web application for tracking video games you have played, are currently playing, or plan to play.
It is inspired by platforms like MyAnimeList, but built specifically for video games.

Users can search for games, add them to their personal list and assign scores.

---

## Live Demo

https://my-game-list-three.vercel.app

---

## Screenshots

### Homepage

![Homepage](/public/images/homepage_ss.png)

### Gamepage

![Gamepage](/public/images/gamepage-ss.png)

---

## Features

- Search for games using the IGDB database
- Add games to a personal list
- Track play status (Playing, Completed, Planned, etc.)
- Rate games with a personal score
- View other users' public game lists
- Discover recently released and popular titles

---

## Tech Stack

### Frontend

- Next.js
- React
- TailwindCSS

### Backend

- Next.js API Routes
- Prisma ORM

### Database

- PostgreSQL (hosted on Neon)

### Authentication

- Google OAuth

### Game Data

- IGDB API provided by Twitch

---

## How It Works

Game information such as titles, covers, and release data are fetched from the IGDB API.
User-specific information such as game status and scores are stored in a PostgreSQL database hosted by Neon.

Prisma is used as the ORM to manage database queries and schema.

---

## Future Improvements maybe

- Game recommendation system
- User profile pages
- Social Features
- Activity feeds
- Improved sorting and filtering

---

## Credits

Game data provided by IGDB via Twitch.
Authentication Provided by Google OAuth.
Database Hosted by Neon
