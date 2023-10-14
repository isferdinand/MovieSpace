//Creating a simple router
const router = {
  currentPage: window.location.pathname,
};

//Display the movies on the page *remember to set pagination
const displayPopularMovies = async () => {
  const { results } = await fetchData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="movie-details.html?${movie.id}">
        ${
          movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}"/>`
            : `<img src="../images/no-img.jpg" class="card-img-top" alt="${movie.title}"/>`
        }
        </a>
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
        </div>`;

    const popularMov = document.querySelector('#popular-movies');
    popularMov.appendChild(div);
  });
};

// Display the movie Details
const displayMovieDetails = async () => {
  const movieId = window.location.search.split('?')[1];

  const movie = await fetchData(`movie/${movieId}`);

  // Overlay for the background Image
  displayBgImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
    <div>
      ${
        movie.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.name}"/>`
          : `<img src="../images/no-img.jpg" class="card-img-top" alt="${movie.name}"/>`
      }
      </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
       ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>${movie.overview}</p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
</div>
<div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString(
        'en-US'
      )}</li>
      <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString(
        'en-US'
      )}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(', ')}</div>
</div>`;

  document.querySelector('#movie-details').appendChild(div);
  console.log(movie);
};

//Display  popular tvshows
const displayPopularShows = async () => {
  const { results } = await fetchData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="tv-details.html?${show.id}">
        ${
          show.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}"/>`
            : `<img src="../images/no-img.jpg" class="card-img-top" alt="${show.name}"/>`
        }
        </a>
        <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
            <small class="text-muted">First Air Date: ${
              show.first_air_date
            }</small>
            </p>
        </div>`;

    const tvShow = document.querySelector('#popular-shows');
    tvShow.appendChild(div);
  });
};

//Display background images of movies or shows on details pages
function displayBgImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// fetch data from movie API
const fetchData = async (endpoint) => {
  const API_KEY = '33d0999529592bd0a2787468cef89038';
  const API_URL = 'https://api.themoviedb.org/3';

  showSpinner();

  const response = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();
  return data;
};

// Show the spinner on load
const showSpinner = () => {
  document.querySelector('.spinner').classList.toggle('show');
};

const hideSpinner = () => {
  document.querySelector('.spinner').classList.toggle('show');
};

// Highlight active page/link
const activeLink = () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === router.currentPage) {
      link.classList.add('active');
    }
  });
};

//initialize app (check the page running)
const init = () => {
  switch (router.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      console.log('show details');
      break;
    case '/search.html':
      console.log('search');
      break;
  }
  activeLink();
};

document.addEventListener('DOMContentLoaded', init);
