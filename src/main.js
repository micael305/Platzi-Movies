const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        'api_key': API_KEY,
    }
});

async function getTrendingMoviesPreview() {
    const {data} = await api('/trending/movie/day'); //con {data} indicamos que solo queremos que nos devuelva la propiedad data
    const movies = data.results;

    trendingMoviesPreviewList.innerHTML = "";

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer); //trendingMoviesPreviewList esta en node.js
    });
}

async function getCategoriesPreview() {
    const {data} = await api('/genre/movie/list');
    const categories = data.genres;
    
    categoriesPreviewList.innerHTML = "";

    categories.forEach(category => {
        const categoriesContainer = document.createElement('div');
        categoriesContainer.classList.add('category-container');
        const categoryH3 = document.createElement('h3');
        categoryH3.classList.add('category-title');
        categoryH3.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name);

        categoryH3.appendChild(categoryTitleText);
        categoriesContainer.appendChild(categoryH3);
        categoriesPreviewList.appendChild(categoriesContainer); 
    });
}
