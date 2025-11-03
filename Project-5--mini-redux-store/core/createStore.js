//? هسته مدیریت state 

const createStore = function (reducer, preloadedState) {

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

        subscribe: function (listeners) {



        }



    }



}