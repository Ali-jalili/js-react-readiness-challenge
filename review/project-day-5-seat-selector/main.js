
import { toggleSeatSelection, getSeatSummary } from "./core/stateManager.js";

import { renderUI } from "./core/uiRenderer.js";


const seatContainer = document.getElementById('seat-container');


const handleSeatClick = function (e) {

    const element = e.target

    if (!element.classList.contains('seat')) {
        return
    }

    if (element.classList.contains('reserved')) {
        return
    }

    const seatId = e.target.dataset.id;

    toggleSeatSelection(seatId);

    const summary = getSeatSummary();


    console.table(summary)

    renderUI(summary)
}


const init = function () {
    renderUI(getSeatSummary())

    seatContainer.addEventListener('click', handleSeatClick)
}

init()


