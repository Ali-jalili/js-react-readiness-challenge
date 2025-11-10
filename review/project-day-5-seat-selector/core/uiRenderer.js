//نمایش صحیح وضعیت (State) در DOM.


import { getSeatSummary } from "./stateManager.js";


// uiRenderer.js

// پیدا کردن تمام صندلی‌ها برای حلقه زدن روی آن‌ها
const seats = document.querySelectorAll('.seat');

// پیدا کردن المان نمایش تعداد صندلی‌های انتخاب شده
const countDisplay = document.getElementById('selected-seats-count');

// پیدا کردن المان نمایش قیمت کل
const totalDisplay = document.getElementById('total-price');

export const renderUI = function (getSeatSummary) {

    countDisplay.textContent = getSeatSummary.count;
    totalDisplay.textContent = getSeatSummary.totalPrice;


    seats.forEach(item => {

        const idItem = item.dataset.id;


        if (getSeatSummary.selectedSeatsIds.includes(idItem)) {

            item.classList.add('selected')
            item.classList.remove('available');
        }

        else {
            item.classList.add('available')
            item.classList.remove('selected');
        }
    })





}