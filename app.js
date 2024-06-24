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

async function searchMovies(searchTerm) {    
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=c24e8ce7&`
    const res = await fetch(`${URL}`);
    const data = await res.json();
    const movieData = await data.Search
    const movieIdArr = movieData.map(elem => elem.imdbID)
    const slicedIdArr = ((movieIdArr).slice(0, 6))
    // this is where i started to encounter confusion while trying to slice the array down to only 6 //
    console.log(movieData)
    console.log(slicedIdArr)
    
    moviesWrapperEl.innerHTML = movieData.map((movie) => renderMovies(movie)).join("")
}

function findMovies() {
    movieSearch.addEventListener("keypress", function(event) {
        let searchTerm = (movieSearch.value)
        if (event.key === "Enter") {
          event.preventDefault();
          searchMovies(searchTerm);
        }
    });
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
                <h4 class="rated">Released: ${movie.Year}</h4>
            </div>
        </div>
    </div>`
}

/** extremely frustrated by this project
 * I can't figure out how to show the movie title search results next to 
 * the "search results" area like David's car app example, I can't even google it well enough to get
 * a stackoverflow thread on it.. 
 * My hope was to fetch the searched movies by title in searchbar (successfully did that)
 * then i wanted to plug the imdbID #s from that initial response, back into a 2nd
 * dynamic URL (similar to the first process) so that the returned data would have
 * detailed movie information that I could then plug into my dynamic html thereby creating
 * multiple movie tiles each with detailed information, instead of just the title and year released
 * that the initial API fetch provides.
 * 
 * feels like I wasted 4 days on something that either isnt possible or is just too advanced
 * 
//  * async function getMovieDetails(movieId) {
//     let detailURL = `https://www.omdbapi.com/?apikey=c24e8ce7&i=${movieId}&plot=full`
//     let detailRes = await fetch(`${detailURL}`);
//     const detailData = await detailRes.json();
//     console.log(detailData)
// }

// getMovieDetails(movieId)


 *  Not happy with my result.
 * 
 * Did a huddle call via slack with Jose Hernandez on Saturday 6-22, he basically told me that what I was
 * trying to do was not ppssible, couldn't explain why or clarify just said not to worry about it. 
 * 
 * at time of submit, I can not get the following to work: 
 * #1 - the onclick() of my search button to activate the search input field. 
 * #2 - to trigger the loading "spinner" properly in my JS.
 * #3 - format the movie tiles that load to be uniform in height, the movie title
 * text is wraps like I want it to, but not sure how to solve the unform size of each tile.
 * #4 - how to .slice down my array to only show 6 results. (i spent a lot of time Saturday on this)
 * 
 * i feel like Thursday and Friday I flew through this project,
 * even set up a modal on the sign in button for practice just because
 * Then spent all day Saturday working on the "final touches" trying to fetch 
 * detailed movie info which tied my brain in knots and confused me so much
 * that I undermined my progress chasing my tail in circles
 * by monday I barely understand what I did even with the JavaScript that works.
 * 
 * I confused myself so badly, I feel totally lost. not satisfied with my final proj result
 * extremely frustrated.
 */

