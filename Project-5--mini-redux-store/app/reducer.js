const INITIAL_STATE = { count: 0 };

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const counterReducer = function (state = INITIAL_STATE, action) {


    switch (action.type) {


        case 'INCREMENT':

            return {
                ...state,
                count: state.count + 1
            }


        case 'DECREMENT':

            return {
                ...state,
                count: state.count - 1
            }

        default:
            return state;




    }


}