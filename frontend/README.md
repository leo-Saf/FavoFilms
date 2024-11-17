# Movie App

A web application built with React that allows users to search for movies, add them to their favorites, and view their favorite movies.

## Features:
- Search for movies using the TMDb API.
- Add movies to the favorites list.
- View and from the favorites list.
- User authentication with JWT.

## Libraries/Technologies Used:
- React
- Axios (for API requests)
- Node.js
- Express
- PostgreSQL (for storing user data and favorites)

## Why React?
I chose React for this project because:
- It is a **component-based** framework that promotes reusability and maintainability of code.
- It has a **large community** and ecosystem that makes it easy to find solutions and resources.
- **JSX** allows for a more intuitive development experience by combining HTML and JavaScript.

### Comparison with Vue and Angular:
- **Vue**: Easier to learn than React, but has a smaller ecosystem and is less popular in large enterprise projects.
- **Angular**: A fully-featured framework with a steeper learning curve and larger bundle size, but great for large-scale applications.






## Getting Started:

1. Clone the repository:
   ```bash

   git clone https://github.com/leo-Saf/FavoFilms.git

- Skapa .env-filen i backedn och lägg till dessa 
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=5432

JWT_SECRET=your_jwt_secret_here

TMDB_API_KEY

- Navigera till backend-mappen och installera beroenden:
cd movie-app/backend
npm install

- Starta backend-servern:
npm start

- Öppna en ny terminal (eller använd split-funktionen i din terminal) och navigera till frontend-mappen:

cd ..
cd frontend
npm install

- Starta frontend-applikationen:
npm start

Öppna din webbläsare och gå till http://localhost:3000
