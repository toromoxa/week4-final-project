// c24e8ce7 OMDB key 
// http://www.omdbapi.com/?apikey=[yourkey]& - template

// http://www.omdbapi.com/?s=${moviename}&apikey=c24e8ce7& - general movie info
// http://www.omdbapi.com/?i=${imdbID}&apikey=c24e8ce7& -detailed movie info
// https://www.omdbapi.com/?apikey=c24e8ce7&t=jaws&plot=full
// https://www.omdbapi.com/?apikey=c24e8ce7&t=${searchTerm}&plot=full

// modal //

let isModalOpen = false
function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove("modal--open");
    }
    isModalOpen = !isModalOpen
    document.body.classList += " modal--open"
}

/** movie api  */

const movieSearch = document.getElementById('movie__search')
const moviesWrapperEl = document.querySelector('.movies__results'); 
let movieData = {}
let movies;

function renderMovies(movie) {
    if (movie.Poster == "N/A") {
        movie.Poster = "assets/404-error-not-found-page-lost-2327795402.png"
    }
    return `<div class="movie">
        <div class="movie__tile">
            <div class="movie__img--box">
                <figure class="movie__img--wrapper">
                    <img src="${movie.Poster}" class="movie__img">
                </figure>
            </div>
            <div class="horizontal__break"></div>
            <div class="movie__info--box">
                <div class="movie__title">
                    ${movie.Title}
                </div>
                <h4 class="rated">Released: ${movie.Year}</h4>
            </div>
        </div>
    </div>`
}

function filterMovies(event) {
    sortMovies(event.target.value)
}

async function sortMovies(filter) {
    if (filter === 'OLD_TO_NEW') {
        movieData.Search.sort((a, b) => a.Year - b.Year)
     }
    else if (filter === 'NEW_TO_OLD') {
        movieData.Search.sort((a, b) => b.Year - a.Year)
    }
    moviesWrapperEl.innerHTML = movieData.Search.map((movie) => renderMovies(movie)).join("");
}

async function searchMovies(searchTerm) {    
    const res = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=c24e8ce7&`);
    movieData = await res.json();
    const moviesHTML = movieData.Search.map((movie) => renderMovies(movie)).join("");

    moviesWrapperEl.innerHTML = moviesHTML;
}

function findMovies() {
    movieSearch.addEventListener("keypress", function(event) {
        let searchTerm = (movieSearch.value)
        if (event.key === "Enter") {
            event.preventDefault();
            console.log('enter was pressed')
          return searchMovies(searchTerm);
        }
    });
}

function clickSearchBtn() {
    let searchTerm = (movieSearch.value)
    console.log('search was clicked')
    return searchMovies(searchTerm)
}

