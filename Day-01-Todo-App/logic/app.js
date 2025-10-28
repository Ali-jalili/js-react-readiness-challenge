import { getInitialState, saveState, addTodo, deleteTodo, toggleTodo, undo } from "./state.js";

import { todoInput, addTodoBtn, todoList, undoButton, renderTodoList, updateActiveCount, updateUndoButton, filterAll, filterActive, filterCompleted } from "./dom.js";


let currentState = getInitialState()
let history = []
let currentFilter = 'all'


const AppController = function () {

    // ۱. رندر اولیه: نمایش Todoها برای اولین بار
    renderTodoList(currentState, currentFilter);

    // ۲. به‌روزرسانی شمارنده: نمایش تعداد وظایف فعال
    updateActiveCount(currentState)

    // ۳. به‌روزرسانی دکمه Undo: غیرفعال کردن اولیه دکمه
    updateUndoButton(history)


    const handleInput = function () {


        let textInputTodo = todoInput.value;

        if (textInputTodo === '') {

            return alert('فیلد ورودی خالی است😶')

        }

        history.push(currentState);

        currentState = addTodo(currentState, textInputTodo);

        saveState(currentState);

        renderTodoList(currentState, currentFilter);

        updateActiveCount(currentState);
        updateUndoButton(history);



        todoInput.value = ''









    }

    addTodoBtn.addEventListener('click', handleInput);

    todoInput.addEventListener('keyup', (event) => {
        // اگر کلید فشرده شده، کلید Enter بود:
        if (event.key === 'Enter') {
            handleInput();
        }
    });




    const handleTodoItemClick = function (e) {

        // ۱. Event Delegation: پیدا کردن ID
        const clickedElement = e.target.closest('[data-id]');
        if (!clickedElement) return;
        const todoId = Number(clickedElement.dataset.id); // ⬅️ استفاده از Number برای اطمینان از نوع

        // ۲. ذخیره تاریخچه (قبل از هر تغییری)
        history.push(currentState);

        // ۳. منطق اصلی: تشخیص Delete یا Toggle
        if (e.target.classList.contains('delete-todo')) {
            // عملیات حذف
            currentState = deleteTodo(currentState, todoId); // ⬅️ تغییر State اصلی 
        } else {
            // عملیات Toggle (کلیک روی خود آیتم یا متن)
            currentState = toggleTodo(currentState, todoId); // ⬅️ تغییر State اصلی
        }

        // ۴. به‌روزرسانی‌های نهایی (فقط یک بار اجرا شوند)
        saveState(currentState);
        renderTodoList(currentState, currentFilter);
        updateActiveCount(currentState);
        updateUndoButton(history);
    }

    todoList.addEventListener('click', handleTodoItemClick);



    const handleUndo = function () {

        let result = undo(history);

        currentState = result.newState;
        history = result.newHistory;

        saveState(currentState);
        renderTodoList(currentState, currentFilter);
        updateActiveCount(currentState);
        updateUndoButton(history);

    }

    undoButton.addEventListener('click', handleUndo)


    const handleFilterChange = function (e) {

        const filterId = e.target.id;

        const newFilter = filterId.replace('filter-', '');
        if (newFilter === currentFilter) return

        const filterButtons = [filterAll, filterActive, filterCompleted];

        // کلاس 'active' را از همه دکمه‌ها حذف کنید.
        filterButtons.forEach(btn => btn.classList.remove('active'))

        e.target.classList.add('active');

        currentFilter = newFilter;

        renderTodoList(currentState, currentFilter);

    }


    filterAll.addEventListener('click', handleFilterChange);
    filterActive.addEventListener('click', handleFilterChange);
    filterCompleted.addEventListener('click', handleFilterChange);



    const handleEditStart = function (e) {

        let listItem = e.target.closest('.todo-item');
        if (!listItem) return;

        if (e.target.classList.contains('item-text')) {

            listItem.classList.add('editing');
            const inputField = listItem.querySelector('.edit-input');
            inputField.focus();
            inputField.select();

        }

    }


    todoList.addEventListener('dblclick', handleEditStart)


}

AppController();



