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
      console.log('shows');
      break;
    case '/movie-details.html':
      console.log('movie details');
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
