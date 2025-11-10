//فقط نگهداری و محاسبهٔ داده‌های خام رو انجام می‌ده.


// متغیر سراسری برای قیمت هر صندلی 
const TICKET_PRICE = 100_000; // تومان (مثال)

// متغیر سراسری برای نگهداری ID صندلی‌هایی که انتخاب شده‌اند
let selectedSeatsIds = [];

export const toggleSeatSelection = function (seatId) {

    if (selectedSeatsIds.includes(seatId)) {

        const idItem = selectedSeatsIds.indexOf(seatId);

        selectedSeatsIds.splice(idItem, 1)

    }
    else {
        selectedSeatsIds.push(seatId)
    }



}


