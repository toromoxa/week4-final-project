// c24e8ce7 OMDB key 
// http://www.omdbapi.com/?apikey=[yourkey]& - template

// http://www.omdbapi.com/?s=${moviename}&apikey=c24e8ce7& - general movie info
// http://www.omdbapi.com/?i=${imdbID}&apikey=c24e8ce7& -detailed movie info


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

async function searchMovies(searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=c24e8ce7&`
    const res = await fetch(`${URL}`);
    const data = await res.json();
    const movieData = await data.Search
    const movieIdarr = await movieData.filter(element => element == element.imdbID)

    moviesWrapperEl.innerHTML = movieData.map((movie) => renderMovies(movie)).join("")

    let movieId = []
        for (let i = 0; i < movieIdarr.length; ++i) {
            if (movieIdarr[i] == element.imdbID) {
                movieId.push(movieIdarr[i]);
            }
        }
        return console.log(movieId)

    // if(data.Response == 'True') renderMovies(data.Search)
}


function findMovies() {
    let searchTerm = (movieSearch.value).trim();
    if(searchTerm.length > 0) {
        searchMovies(searchTerm)
    }
}

function renderMovies(movie) {
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
                <h4 class="rated">PG</h4>
                <div class="movie__ratings">
                    <h6 class="rotten__tomatoes">Rotten Tomatoes 97%</h6>
                </div>
                <div class="movie__runtime">
                    127 minutes
                </div>
            </div>
        </div>
    </div>`
}
