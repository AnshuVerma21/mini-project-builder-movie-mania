/selecting the wrapper class
var wrapper = document.querySelector(".wrapper")

var genres = [{
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

var movieURL = ""

var trailerId=""

var list = Array.prototype.slice.call(document.querySelectorAll(".genres"))
list.map((genre, index) => {
  genre.onclick = () => {
    movieURL = `https://api.themoviedb.org/3/list/${genres[index].id}?api_key=6ce93bc5ff54bdbf126d3a288d7b7c88&language=en`
    loadGenreMovies(genres[index].name, movieURL)
  }
})

function loadGenreMovies(movieGenre, url) {
  document.querySelector("#title").innerHTML = movieGenre + " Movies"
  wrapper.innerHTML = " "
  axios.get(url)
    .then(response => {

      if (response.data.items.length > 0)
        for (const item of response.data.items) {

          axios.get(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=6ce93bc5ff54bdbf126d3a288d7b7c88`)
          .then(response=>{
            
            wrapper.innerHTML += `
            <div class="card">
                  <img src="http://image.tmdb.org/t/p/w500/${item.poster_path}" alt="">
                  <div class="descriptions">
                      <h4>${item.original_title}</h4>
                      <h6>Release Date: ${item.release_date}</h6>
                      <p>${item.overview}</p>
                      <button onclick="loadTrailer('${response.data.results[0].key}')">
                          <i class="fab fa-youtube"></i>
                          Play trailer on YouTube
                      </button>
                  </div>
              </div>
            `
        })
        }
      else{
        document.querySelector("#title").innerHTML = "Sorry, No "+movieGenre + " Movies"
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function loadPopularOrUpcomingOrTopRatedMovies(movieGenre, url) {
  document.querySelector("#title").innerHTML = movieGenre + " Movies"
  wrapper.innerHTML = " "
  axios.get(url)
    .then(response => {
      for (const item of response.data.results) {
        axios.get(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=6ce93bc5ff54bdbf126d3a288d7b7c88`)
        .then(response=>{
          wrapper.innerHTML += `
          <div class="card">
                <img src="http://image.tmdb.org/t/p/w500/${item.poster_path}" alt="">
                <div class="descriptions">
                    <h4>${item.original_title}</h4>
                    <h6>Release Date: ${item.release_date}</h6>
                    <p>${item.overview}</p>
                    <button onclick="loadTrailer('${response.data.results[0].key}')">
                        <i class="fab fa-youtube"></i>
                        Play trailer on YouTube
                    </button>
                </div>
            </div>
          `
        })
      }
    })
    .catch(err => {
      console.error(err)
    })
}
 
function loadTrailer(key){
  document.querySelector("#iframe").setAttribute("src",`https://www.youtube.com/embed/${key}`)
  document.querySelector("#myNav").style.display = "block";
}

function closePopup() {
  document.querySelector("#myNav").style.display = "none";
  document.querySelector("#iframe").setAttribute("src"," ")
}


document.querySelector("#home").onclick=()=>{
  loadPopularOrUpcomingOrTopRatedMovies("Popular", "https://api.themoviedb.org/3/movie/popular?api_key=6ce93bc5ff54bdbf126d3a288d7b7c88&language=en")
}

document.querySelector("#top-rated").onclick=()=>{
  loadPopularOrUpcomingOrTopRatedMovies("Top Rated","https://api.themoviedb.org/3/movie/top_rated?api_key=6ce93bc5ff54bdbf126d3a288d7b7c88&language=en")
}

document.querySelector("#popular").onclick=()=>{
  loadPopularOrUpcomingOrTopRatedMovies("Popular", "https://api.themoviedb.org/3/movie/popular?api_key=6ce93bc5ff54bdbf126d3a288d7b7c88&language=en")
}

document.querySelector("#upcoming").onclick=()=>{
  loadPopularOrUpcomingOrTopRatedMovies("Upcoming","https://api.themoviedb.org/3/movie/upcoming?api_key=6ce93bc5ff54bdbf126d3a288d7b7c88&language=en")
}

window.onload = () => {
  loadPopularOrUpcomingOrTopRatedMovies("Popular", "https://api.themoviedb.org/3/movie/popular?api_key=6ce93bc5ff54bdbf126d3a288d7b7c88&language=en-US&page=1")
}