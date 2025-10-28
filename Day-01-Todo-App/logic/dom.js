// ۱. المان‌های اصلی ورودی و لیست
export const todoInput = document.getElementById('todo-input');
export const todoList = document.getElementById('todo-list');
export const addTodoBtn = document.getElementById('add-todo-btn');

// ۲. المان‌های کنترل و Undo
export const undoButton = document.getElementById('undo-btn');

// ۳. المان‌های فیلتر (برای مدیریت نمایش)
export const filterAll = document.getElementById('filter-all');
export const filterActive = document.getElementById('filter-active');
export const filterCompleted = document.getElementById('filter-completed');

// ۴. المان نمایش خلاصه
export const activeCountSpan = document.getElementById('active-count');



const createTodoElement = function (todo) {

    const newElement = document.createElement('li');

    newElement.setAttribute('data-id', todo.id);

    newElement.textContent = todo.text;

    if (todo.isCompleted) {
        newElement.classList.add('completed')
    }
    return newElement;

}


const renderTodoList = function (todos, currentFilter) {

    todoList.textContent = '';


    let filteredTodos;

    if (currentFilter === 'active') {
        filteredTodos = todos.filter(item => !item.isCompleted)
    }

    else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(item => item.isCompleted)
    }

    else {
        filteredTodos = todos
    }

    filteredTodos.forEach(item => {

        const todoElement = createTodoElement(item)

        todoList.append(todoElement)

    })


}



const updateActiveCount = function (todos) {

    const upItem = todos.filter(item => item.isCompleted === false);

    activeCountSpan.textContent = upItem.lengthک
}



const updateUndoButton = function (history) {

    if (history.length > 0) {
        undoButton.disabled = false

    }

    else {
        undoButton.disabled = true

    }
}