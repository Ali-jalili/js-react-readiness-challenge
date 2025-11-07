import { debounce } from "./utils/index.js";


const searchInput = document.getElementById('search-input');
const typingStatusEl = document.getElementById('typing-status');
const lastSearchEl = document.getElementById('last-search');


const performSearch = function (e) {

    let inputVlaue = e.target.value;

    console.log(`جستجوی واقعی انجام شد برای: ${inputVlaue}`);

    lastSearchEl.textContent = inputVlaue;
    typingStatusEl.textContent = 'آماده'


}


const DEBOUNCE_DELAY = 700;
const debouncedSearchHandler = debounce(performSearch, DEBOUNCE_DELAY);


searchInput.addEventListener('input', function (e) {

    typingStatusEl.textContent = 'در حال تایپ (منتظر Debounce)...';

    debouncedSearchHandler(e)

})