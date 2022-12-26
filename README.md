# Netflix Clone movies trailer
Demo: [link](https://moviestrailer.surge.sh/)

Please rate this project if you like it !!  :bowtie:

This project is a front end clone of Netflix. 
It was created with React native app.
It uses [The MovieDB Api](https://www.themoviedb.org/documentation/api) 
to get  movies and display details and preview trailer when mouse hover, and movie details in full page.
Movie data was pulled from TMDB and trailer videos from Youtube. To achieve this i made lazy loading techniques to efficiently render and update UI

Running Project Locally

Install dependencies: run npm install in root project

Get API key from [here](https://www.themoviedb.org/documentation/api)

Change .env file in root project and add API_KEY=YOUR_API_KEY_HERE

Run project: npm run start

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Tools used
 - using Route maping for rendering mutliples pages with react router
 - Bootstrap modal
 - Hooks with UseState and UseEffect to synchronize api call and transition style effect synchronization
 - React Router with parameters(dynamic route generation).
 - TMDB Api 
 - handle environment variable with .env
 
### Preview

  
![](./src/assets/demo.gif?raw=true)
