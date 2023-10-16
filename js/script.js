//Creating a simple router
const router = {
  currentPage: window.location.pathname,
  api: {
    apiKey: '33d0999529592bd0a2787468cef89038',
    apiUrl: 'https://api.themoviedb.org/3',
  },
  //the search parameter variables
  search: {
    type: '',
    searchTerm: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
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

//Display the show details to the DOM
const displayShowDetails = async () => {
  const seriesId = window.location.search.split('?')[1];

  const show = await fetchData(`tv/${seriesId}`);

  // Overlay for the background Image
  displayBgImage('show', show.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    show.poster_path
      ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}"/>`
      : `<img src="../images/no-img.jpg" class="card-img-top" alt="${show.name}"/>`
  }
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
    <p>${show.overview}</p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}  
    </ul>
    <a href="${
      show.homepage
    }" target="_blank" class="btn">Visit Show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
  <li><span class="text-secondary">Number Of Seasons:</span> ${
    show.number_of_seasons
  }</li>
  <li><span class="text-secondary">Number Of Episodes:</span> ${
    show.number_of_episodes
  }</li>
    <li>
      <span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.name
      }
    </li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${show.production_companies
    .map((company) => company.name)
    .join(', ')}</div>
</div>
  `;

  document.querySelector('#show-details').appendChild(div);
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

//Display slider movies (Using Swiper)
const displaySlider = async () => {
  const { results } = await fetchData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
      <a href="movie-details.html?${movie.id}">
      ${
        movie.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}"/>`
          : `<img src="../images/no-img.jpg" class="card-img-top" alt="${movie.title}"/>`
      }
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>`;
    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
};

const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
};

// Search Movies/ Shows
const search = async () => {
  // first get the querystring
  const queryString = window.location.search;
  const urlParameters = new URLSearchParams(queryString);
  router.search.type = urlParameters.get('type');
  router.search.searchTerm = urlParameters.get('search-term');

  if (router.search.searchTerm !== '' && router.search.searchTerm !== null) {
    //make the request and display the data
    const { results, page, total_pages, total_results } =
      await fetchSearchData();

    router.search.page = page;
    router.search.totalPages = total_pages;
    router.search.totalResults = total_results;

    if (results.length === 0) {
      customAlert('No results Found', 'error');
      return;
    } else {
      displaySearchResulsts(results);

      //clear the input after searching
      // document.querySelector('#search-term').value = '';
    }
  } else {
    customAlert('Enter a search term', 'error');
  }
};

//Display search results to DOM
const displaySearchResulsts = (results) => {
  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="${router.search.type}-details.html?${result.id}">
      ${
        result.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${
              result.poster_path
            }" class="card-img-top" alt="${
              router.search.type === 'movie' ? result.title : result.name
            }"/>`
          : `<img src="../images/no-img.jpg" class="card-img-top" alt="${
              router.search.type === 'movie' ? result.title : result.name
            }"/>`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${
        router.search.type === 'movie' ? result.title : result.name
      }</h5>
      <p class="card-text">
      <small class="text-muted">Release: ${
        router.search.type === 'movie'
          ? result.release_date
          : result.first_air_date
      }</small>
      </p>
    </div>`;

    document.querySelector('#search-results-heading').innerHTML = `
     <h2>${results.length} of ${router.search.totalResults} for ${router.search.searchTerm}</h2>`;

    document.querySelector('#search-results').appendChild(div);
  });
};

// Make search Request
const fetchSearchData = async () => {
  const API_KEY = router.api.apiKey;
  const API_URL = router.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}/search/${router.search.type}?api_key=${API_KEY}&language=en-US&query=${router.search.searchTerm}`
  );

  const data = await response.json();
  hideSpinner();
  return data;
};

//Fetch data
const fetchData = async (endpoint) => {
  const API_KEY = router.api.apiKey;
  const API_URL = router.api.apiUrl;

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

//Alert box if search item is empty
const customAlert = (message, className) => {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
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
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }
  activeLink();
};

document.addEventListener('DOMContentLoaded', init);
