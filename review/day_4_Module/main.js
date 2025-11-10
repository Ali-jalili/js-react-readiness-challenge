//آرکستراسیون و اتصال Events

import { getProducts, setActiveFilter, getFilteredProducts } from "./utils/productService.js";

import { renderProducts } from "./utils/viewRenderer.js";



const filterControls = document.getElementById('filter-controls')


const init = function () {

    renderProducts(getProducts())

    setupFilterListeners()

}


const setupFilterListeners = function () {

    const handleFilterClick = function (e) {

        const category = e.target.dataset.category

        setActiveFilter(category)

        const itemFilter = getFilteredProducts();

        renderProducts(itemFilter)

    }

    filterControls.addEventListener('click', handleFilterClick);

}


init()