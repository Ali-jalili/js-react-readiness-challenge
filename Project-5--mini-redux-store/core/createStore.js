//? هسته مدیریت state 

export const createStore = function (reducer, preloadedState) {

    let state = preloadedState;
    const listeners = [];



    let obj = {

        getState: function () {
            return state
        },

        dispatch: function (action) {
            state = reducer(state, action);

            listeners.forEach(fun => fun())
        },

        subscribe: function (listener) {

            listeners.push(listener);

            const unsubscribe = function () {

                const itemIndex = listeners.indexOf(listener)

                listeners.splice(itemIndex, 1)


            }

            return unsubscribe

        },



    }


    dispatch({ type: '@@INIT' });

    return {
        getState,
        dispatch,
        subscribe
    }

}