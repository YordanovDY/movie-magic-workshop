const viewDataUtil = {
    getCategoriesViewData
}

function getCategoriesViewData(category) {
    const categoriesMap = {
        'tv-show': 'TV Show',
        'animation': 'Animation',
        'movie': 'Movie',
        'documentary': 'Documentary',
        'short-film': 'Short Film'
    }

    const categories = Object.keys(categoriesMap).map(key => {
        return {
            value: key,
            label: categoriesMap[key],
            selected: key === category ? 'selected' : ''
        }
    });

    return categories;
}

export default viewDataUtil;