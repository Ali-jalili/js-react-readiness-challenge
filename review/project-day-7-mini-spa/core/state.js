
// 1. تعریف متغیر وضعیت (State)
let state = {

    activeTab: 'profile',
    isLoading: true,
    data: {},
    error: null

};

// 2. تعریف آرایه شنوندگان (Listeners)
let listeners = []



export const getState = () => state;


export const subscribe = (listener) => listeners.push(listener)


