//? هسته مدیریت state 

// export const createStore = function (reducer, preloadedState) {

//     let state = preloadedState;
//     const listeners = [];



//     let obj = {

//         getState: function () {
//             return state
//         },

//         dispatch: function (action) {
//             state = reducer(state, action);

//             listeners.forEach(fun => fun())
//         },

//         subscribe: function (listener) {

//             listeners.push(listener);

//             const unsubscribe = function () {

//                 const itemIndex = listeners.indexOf(listener)

//                 listeners.splice(itemIndex, 1)


//             }

//             return unsubscribe

//         },



//     }


//     dispatch({ type: '@@INIT' });

//     return {
//         getState,
//         dispatch,
//         subscribe
//     }

// }


export const createStore = function (reducer, preloadedState) {

    let state = preloadedState;
    const listeners = [];

    // متدها را به عنوان توابع معمولی و مستقل تعریف کن (مانند getState)

    const getState = function () {
        return state;
    };

    const dispatch = function (action) {
        // ... منطق
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = function (listener) {
        // ... منطق
        listeners.push(listener);
        return function unsubscribe() {

            const itemIndex = listeners.indexOf(listener);
            if (itemIndex > -1) {
                listeners.splice(itemIndex, 1);
            }
        };
    };

    // حالا dispatch به صورت محلی تعریف شده و قابل فراخوانی است:
    dispatch({ type: '@@INIT' }); // ✅ اینجا کار می‌کنه!

    // در نهایت، توابع را برگردان
    return {
        getState,
        dispatch,
        subscribe
    };
};