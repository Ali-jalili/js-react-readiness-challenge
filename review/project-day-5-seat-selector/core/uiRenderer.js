//نمایش صحیح وضعیت (State) در DOM.


import { getSeatSummary } from "./stateManager.js";

// پیدا کردن تمام صندلی‌ها برای حلقه زدن روی آن‌ها
const seats = document.querySelectorAll('.seat');

// پیدا کردن المان نمایش تعداد صندلی‌های انتخاب شده
const countDisplay = document.getElementById('selected-seats-count');

// پیدا کردن المان نمایش قیمت کل
const totalDisplay = document.getElementById('total-price');



// نگهداری وضعیت صندلی‌های انتخاب شده در رندر قبلی
let previousSelectedIds = []

const getSeatElementById = (seatId) => {
    // از کوئری selector برای پیدا کردن المانی که data-id آن برابر با seatId است، استفاده می‌کنیم.
    return document.querySelector(`[data-id="${seatId}"]`);
};

export const renderUI = function (summary) { // 💡 آرگومان را به 'summary' تغییر دادم

    const startTime = performance.now();

    // 1. منطق Diffing (مقایسه) - شبیه‌سازی Virtual DOM
    const seatsAdded = summary.selectedSeatsIds.filter(item => !previousSelectedIds.includes(item));
    const seatsRemoved = previousSelectedIds.filter(item => !summary.selectedSeatsIds.includes(item));

    // 2. به‌روزرسانی اطلاعات خلاصه
    countDisplay.textContent = summary.count;
    totalDisplay.textContent = summary.totalPrice;

    // 3. اجرای تغییرات فقط روی صندلی‌های 'اضافه شده'
    seatsAdded.forEach(seatId => {
        const seatEl = getSeatElementById(seatId);
        seatEl.classList.add('selected');
        seatEl.classList.remove('available');
    });

    // 4. اجرای تغییرات فقط روی صندلی‌های 'حذف شده'
    seatsRemoved.forEach(seatId => {
        const seatEl = getSeatElementById(seatId);
        seatEl.classList.add('available');
        seatEl.classList.remove('selected');
    });

    // 5. به‌روزرسانی حافظه برای رندر بعدی
    // از Spread Operator (...) استفاده می‌کنیم تا یک کپی از آرایه را ذخیره کنیم و نه خود رفرنس را.
    previousSelectedIds = [...summary.selectedSeatsIds];

    const endTime = performance.now();
    const totalTime = (endTime - startTime).toFixed(2);

    // زمان اجرای کد الآن باید حتی از قبل هم کمتر باشد!
    console.log(`Render Time (Optimized): ${totalTime}ms`);
}