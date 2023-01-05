# Netflix Clone movies trailer 

![image](./src/assets/preview.png?raw=true)

![](./src/assets/demo.gif?raw=true)


Demo: (use desktop mode for mobile)

 [First Version](https://moviestrailer.surge.sh/)

 [Second Version](https://moviestrailer2.surge.sh/)

Please rate this project if you like it !!  :bowtie: :pleading_face: :star:

This project is a front end clone of Netflix. 
It was created with React native app.
It uses [The MovieDB Api](https://www.themoviedb.org/documentation/api) 
to get  movies and display details and preview trailer when mouse hover or in header, and movie details in full page.
Movie data was pulled from TMDB and trailer videos from Youtube. To achieve this i made lazy loading techniques to efficiently render and update UI
with hooks and useEffect technical.

Running Project Locally

Clone Project : 

```git clone https://github.com/ismailazdad/Netflix_clone.git```

Go to project directory :

```cd Netflix_clone/```

Install dependencies:  

```npm install``` in the root project

Get API key from [here](https://www.themoviedb.org/signup)

Change ```.env``` file in root project and replace  ```YOUR_API_KEY_HERE``` by your personnal themoviedb key

Run project: 

```npm run start```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Tools used
 - using Route maping for rendering mutliples pages with react router  with parameters(dynamic route generation)
 - Bootstrap modal
 - use globalStyle, and style.jsx and styled component
 - Hooks with UseState and UseEffect to synchronize api call and transition style effect synchronization and propTypes
 - TMDB Api 
 - handle environment variable with .env
 
### Preview

  


![](./src/assets/demo2.gif?raw=true)
