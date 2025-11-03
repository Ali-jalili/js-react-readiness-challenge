// ۱. المان‌های اصلی ورودی و لیست
export const todoInput = document.getElementById('todo-input');
export const todoList = document.getElementById('todo-list');
export const addTodoBtn = document.getElementById('add-todo-btn');
export const inputArea = document.querySelector('.input-area');
export const errorMessageElement = document.getElementById('error-message')

// ۲. المان‌های کنترل و Undo
export const undoButton = document.getElementById('undo-btn');

// ۳. المان‌های فیلتر (برای مدیریت نمایش)
export const filterAll = document.getElementById('filter-all');
export const filterActive = document.getElementById('filter-active');
export const filterCompleted = document.getElementById('filter-completed');

// ۴. المان نمایش خلاصه
export const activeCountSpan = document.getElementById('active-count');



export const createTodoElement = function (todo) {

    //Creat LI
    const newElement = document.createElement('li');
    newElement.classList.add('todo-item')
    newElement.setAttribute('data-id', todo.id);
    // newElement.textContent = todo.text;
    if (todo.isCompleted) {
        newElement.classList.add('completed')
    }


    //Cret Span for show Text

    const textSpan = document.createElement('span')
    textSpan.textContent = todo.text;
    textSpan.classList.add('item-text');
    newElement.appendChild(textSpan)


    //Creat Input for Edit Item
    const editInputItem = document.createElement('input');
    editInputItem.type = 'text';
    editInputItem.value = todo.text;
    editInputItem.classList.add('edit-input');
    newElement.appendChild(editInputItem);


    //Creat Div for actions
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('item-actions');


    //Creat Toggle Btn
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'تیک';
    toggleBtn.classList.add('action-btn', 'complete-btn');
    toggleBtn.setAttribute('data-action', 'toggle');
    actionsDiv.appendChild(toggleBtn);

    //Creat Delete Btn
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'حذف';
    deleteBtn.classList.add('action-btn', 'delete-btn');
    deleteBtn.setAttribute('data-action', 'delete');
    actionsDiv.appendChild(deleteBtn);


    newElement.appendChild(actionsDiv);

    return newElement;

}



export const renderTodoList = function (todos, currentFilter) {

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



export const updateActiveCount = function (todos) {

    const upItem = todos.filter(item => item.isCompleted === false);

    activeCountSpan.textContent = upItem.length
}



export const updateUndoButton = function (history) {

    if (history.length > 0) {
        undoButton.disabled = false

    }

    else {
        undoButton.disabled = true

    }
}




export const errText = (message) => {
    // این تابع منطق تنظیم متن، نمایش و مخفی کردن را مدیریت می کند.
    errorMessageElement.textContent = message;
    errorMessageElement.classList.add('visible');
    addTodoBtn.disabled = true; // غیر فعال کردن دکمه افزودن

    // حذف پیام خطا بعد از 3 ثانیه
    setTimeout(() => {
        errorMessageElement.classList.remove('visible');
        errorMessageElement.textContent = '';
        addTodoBtn.disabled = false;
    }, 3000);
};