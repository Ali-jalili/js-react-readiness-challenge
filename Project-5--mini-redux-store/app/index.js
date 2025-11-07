import { createStore } from "../core/createStore.js";
import { counterReducer } from '../app/reducer.js';
import { incrementAction, decrementAction } from "./actions.js";


// app/index.js - مرحله ۱: گرفتن المان‌های DOM

const counterValue = document.getElementById('counter-value');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');



const store = createStore(counterReducer)

const render = function () {

    let currentState = store.getState();

    counterValue.textContent = currentState.count

}

store.subscribe(render);

render()