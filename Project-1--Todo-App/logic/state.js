export const getInitialState = function () {

    const itemTodo = localStorage.getItem('todos');

    if (!itemTodo) {

        return []
    }

    try {

        const parsedTodos = JSON.parse(itemTodo);
        return parsedTodos;

    }

    catch (error) {
        console.error("خطا در بازیابی داده‌های LocalStorage: داده خراب است.", error.message);
        return [];
    }

}


export const addTodo = function (state, text) {

    let newTodo = {

        id: +new Date(),
        text: text,
        isCompleted: false
    }


    let newState = [...state, newTodo];

    return newState

}


export const deleteTodo = function (state, id) {

    let deletItem = state.filter(item => item.id !== id)
    return deletItem

}


export const toggleTodo = function (state, id) {


    let toggleItem = state.map(item => {

        if (item.id !== id) {

            return item
        }
        else {
            let newObj = { ...item, isCompleted: !item.isCompleted };

            return newObj
        }
    })


    return toggleItem
}


export const saveState = function (state) {

    const postItem = JSON.stringify(state);

    localStorage.setItem('todos', postItem)
}


export const undo = function (history) {

    if (history.length === 0) {
        console.log('تاریخچه خالی است');
        alert('تاریخچه خالی است')
        return []

    }

    else {


        let newState = history.pop();

        return {
            'newState': newState,
            'newHistory': history
        }



    }

}





export const editTodo = function (state, id, newText) {


    let newTodoEdit = state.map(item => {
        if (item.id === id) {
            return {
                ...item,
                text: newText
            }
        }

        return item


    })

    return newTodoEdit

}

