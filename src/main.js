const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        'api_key': API_KEY,
    }
});

//Utils

async function createMovies(movies, container) {
    container.innerHTML = "";

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

async function createCategories(categories, container) {
    container.innerHTML = "";

    categories.forEach(category => {
        const categoriesContainer = document.createElement('div');
        categoriesContainer.classList.add('category-container');
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        categoryTitle.appendChild(categoryTitleText);
        categoriesContainer.appendChild(categoryTitle);
        container.appendChild(categoriesContainer); 
    });
}

//Llamdo a APIS

async function getTrendingMoviesPreview() {

    const {data} = await api('/trending/movie/day'); //con {data} indicamos que solo queremos que nos devuelva la propiedad data
    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
    const {data} = await api('/genre/movie/list');
    const categories = data.genres;
    
    createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
    const {data} = await api('/discover/movie', {
        params: {
            with_genres: id
        }
    });

    const movies = data.results;

    createMovies(movies, genericSection);

}

async function getMoviesBySearch(query) {
    const {data} = await api('/search/movie', {
        params: {
            query,
        },
    });
    const movies = data.results;
    createMovies(movies, genericSection);
}

async function getTrendingMovies() {
    const {data} = await api('trending/movie/day');
    const movies = data.results;

    createMovies(movies, genericSection);
}

async function getMovieById(id) {
    const {data: movie} = await api(`/movie/${id}`);

    const movieImagUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImagUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview; 
    movieDetailScore.textContent = movie.vote_average;
    
    createCategories(movie.genres, movieDetailCategoriesList);
}

async function getRelatedMoviesId(id) {
    const {data} = await api(`/movie/${id}/recommendations`);
    const movies = data.results;

    createMovies(movies, relatedMoviesContainer);
}