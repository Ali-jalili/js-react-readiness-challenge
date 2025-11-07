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