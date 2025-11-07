import { debounce, memoize } from "./utils/index.js";


const searchInput = document.getElementById('search-input');
const typingStatusEl = document.getElementById('typing-status');
const lastSearchEl = document.getElementById('last-search');



const memoizeInput = document.getElementById('memoize-input');
const calculateBtn = document.getElementById('calculate-btn');
const calcResultEl = document.getElementById('calc-result');
const cacheStatusEl = document.getElementById('cache-status');


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


const calculateFactorial = function (num) {

    if (num === 0 || num === 1) return 1;

    let result = 1;

    for (let i = 2; i <= num; i++) {

        result *= i;
    }
    return result;

}


const memoizedFactorial = memoize(calculateFactorial);

calculateBtn.addEventListener('click', function () {

    const numInput = parseInt(memoizeInput.value);

    // ۲. اجرای تابع Memoized و ذخیره نتیجه
    const startTime = performance.now(); // شروع محاسبه زمان
    const result = memoizedFactorial(numInput);
    const endTime = performance.now(); // پایان محاسبه زمان

    // ۳. بروزرسانی UI و نمایش وضعیت
    calcResultEl.textContent = result;

    // نمایش وضعیت Cache بر اساس زمان اجرا
    const executionTime = (endTime - startTime).toFixed(3);

    if (executionTime < 1) { // اگر زمان اجرا نزدیک به صفر بود (یعنی از Cache آمده)
        cacheStatusEl.textContent = `Cache Hit (زمان: ${executionTime}ms)`;
        cacheStatusEl.style.color = 'blue';
    } else { // اگر زمانبر بود (محاسبه واقعی انجام شده)
        cacheStatusEl.textContent = `Cache Miss (زمان: ${executionTime}ms)`;
        cacheStatusEl.style.color = 'red';
    }
})