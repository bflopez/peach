# Peachflix

A OMDb API front end to search for movies

## Getting Started

First make sure you have an API key from https://www.omdbapi.com/apikey.aspx

Create a .env.local file in your root and add your key. Similar to the `.env.local.example` file

```js
VITE_OMBD_API_KEY = XXXXXXXX
```

Next install dependencies and run project

```js
npm
install
npm
run
dev
```
## Overview

Project Requirements:

1. [x] As a user, I want to see a search bar when I open the app.
2. [x] As a user, I want to search for a movie by its title.
3. [x] As a user, I want to click on a movie from the search results and view more detailed information about the movie (like the title, description, release date, rating, and poster).
4. [x] As a user, I want to paginate through search results whenever there are additional paged results.
5. [x] As a user, I want to add or remove movies from my personal favorite movie list.

## Technical Choices

I implemented this project using React and TypeScript. I made sure the UI matched the design mocks
as much as possible. I implemented error handling and loading states where needed. I based the project
structure off of React best practices learned from Bulletproof React and other sources. I focused on code readability
and maintainability.

I used the libraries that are well known in the React ecosystem such as TanStack Query, Axios, React Router, and Radix
UI to name a few. I used TanStack Query for most of my state management as well as URL query params. I did not think we
needed anything like Redux or Zustand for this project. I used local storage as suggested for storing user favorites.

I handled errors with an Error Boundary and added loading states using Skeleton from Radix UI. I also considered
accessibility by making sure the app was tabbable.

## Areas to Improve

With more time I would have liked to create a better pagination solution. Although react-headless-pagination seems to be
a good library I do not feel like it fits into the project as easily as a custom solution. I also think I could improve
loading states for the movie details dialog. I would take some of the extra time to do a thorough analysis on
accessibility. I would also take some time to clean up the styling and customize the Radix UI theme where needed. I also
felt like the OMDb API was lacking in some areas. For example with error handling and being properly RESTful. With more
time I would consider using a different API. It would also make sense to create a backend to handle the API in order to
hide the API key. I would analyze where it would make sense to add CONSTANT variables. For example, things like the
TanStack Query keys should be CONSTANTS and be managed in a single file. As we scale it is important to make sure a key
isn't already being used. I am sure there are a few more things that will come to mind in the future.

## Areas To Improve List
1. [ ] Improve Pagination
2. [ ] Add loading state to Movie Details Dialog
3. [ ] Check for accessibility issues
4. [ ] Clean up styling and further customize Radix UI Theme
5. [ ] Find alternative API and/or build own API to hide API key
6. [ ] Add CONSTANTS
7. [ ] Create CONSTANT file for TanStack Query keys