async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();
    const movies = data.results;

    const trendingPreviewMoviesContainer= document.querySelector('#trendingPreview .trendingPreview-movieList');

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
}

async function getCategoriesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data = await res.json();
    const categories = data.genres;

    const trendingCategoriesContainer= document.querySelector('#categoriesPreview .categoriesPreview-list');
    categories.forEach(category => {
        const categoriesContainer = document.createElement('div');
        categoriesContainer.classList.add('category-container');
        const categoryH3 = document.createElement('h3');
        categoryH3.classList.add('category-title');
        categoryH3.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name);

        categoryH3.appendChild(categoryTitleText);
        categoriesContainer.appendChild(categoryH3);
        trendingCategoriesContainer.appendChild(categoriesContainer);
    });
}

getTrendingMoviesPreview();
getCategoriesPreview();