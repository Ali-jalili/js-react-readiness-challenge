//فقط نگهداری و محاسبهٔ داده‌های خام رو انجام می‌ده.


// متغیر سراسری برای قیمت هر صندلی 
const TICKET_PRICE = 100_000; // تومان (مثال)

// متغیر سراسری برای نگهداری ID صندلی‌هایی که انتخاب شده‌اند
let selectedSeatsIds = [];

export const toggleSeatSelection = function (seatId) {


    // اگر صندلی قبلاً انتخاب شده:

    if (selectedSeatsIds.includes(seatId)) {

        // 1. ایندکس (موقعیت) آن را پیدا کن.

        const idItem = selectedSeatsIds.indexOf(seatId);

        // 2. از آن ایندکس شروع کن و یک آیتم را حذف کن (حذف صندلی).

        selectedSeatsIds.splice(idItem, 1)

    }

    // اگر صندلی انتخاب نشده:

    else {

        // آن را اضافه کن.

        selectedSeatsIds.push(seatId)
    }



}


export const getSeatSummary = function () {

    const count = selectedSeatsIds.length;

    const totalPrice = TICKET_PRICE * count;

    return {
        selectedSeatsIds,
        count,
        totalPrice

    }

}

