const apiKey = 'e6806698a53c899ded27dc011834f67e'; 
const searchButton = document.getElementById('searchButton');
const movieInput = document.getElementById('movieInput');
const movieInfo = document.getElementById('movieInfo');

searchButton.addEventListener('click', () => {
    const movieTitle = movieInput.value;
    if (movieTitle) {
        fetchMovieData(movieTitle);
    } else {
        movieInfo.innerHTML = `<p>Please enter a movie title!</p>`;
    }
});

function fetchMovieData(title) {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // helps for debugging
            if (data.results && data.results.length > 0) {
                displayMovieInfo(data.results[0]);  // shows the first movie as a result
            } else {
                movieInfo.innerHTML = `<p>Movie not found!</p>`;
            }
        })
        .catch(error => {
            movieInfo.innerHTML = `<p>Error fetching data.</p>`;
            console.error('Error:', error);
        });
}

function displayMovieInfo(movie) {
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

    movieInfo.innerHTML = `
        <div class="movie-card">
            <h2>${movie.title} (${movie.release_date.split('-')[0]})</h2>
            ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title} Poster">` : ''}
            <p><strong>Overview:</strong> ${movie.overview}</p>
            <p><strong>Rating:</strong> ${movie.vote_average}</p>
        </div>
    `;
}
