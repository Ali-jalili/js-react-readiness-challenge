export const debounce = function (func, delay) {

    let timerId;

    return function (...args) {

        const context = this;

        if (timerId) {
            clearTimeout(timerId)
        }

        timerId = setTimeout(() => {
            func.apply(context, args)

        }, delay)


    }
}


export const memoize = function (func) {

    let cache = {};


    return function (...args) {

        const key = JSON.stringify(args);

        if (key in cache) {

            console.log(`Cache Hit! برگرداندن نتیجه ذخیره‌شده برای: ${key}`);

            return cache[key]; // ... نتیجه را مستقیماً برگردان
        }

        const result = func.apply(this, args);

        // ذخیره نتیجه جدید در Cache قبل از برگرداندن
        cache[key] = result;

        console.log(`Cache Miss! محاسبه جدید انجام و ذخیره شد.`);

        return result;

    }



}