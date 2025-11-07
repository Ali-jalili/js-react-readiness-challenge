import { INCREMENT, DECREMENT } from "./reducer.js";

export const incrementAction = function () {


    return {
        type: INCREMENT
    }

}


export const decrementAction = function () {
    return {
        type: DECREMENT
    }
}