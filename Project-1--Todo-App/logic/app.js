import { getInitialState, saveState, addTodo, deleteTodo, toggleTodo, undo, editTodo } from "./state.js";

import { todoInput, addTodoBtn, todoList, undoButton, renderTodoList, updateActiveCount, updateUndoButton, filterAll, filterActive, filterCompleted, errText } from "./dom.js";


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

            return errText('فیلد ورودی خالی است😶')

        }

        history.push(currentState);

        currentState = addTodo(currentState, textInputTodo);

        saveState(currentState);

        renderTodoList(currentState, currentFilter);

        updateActiveCount(currentState);
        updateUndoButton(history);

        todoInput.value = ''

    }


    const handleTodoItemClick = function (e) {

        const clickedElement = e.target.closest('[data-id]');
        if (!clickedElement) return;
        const todoId = Number(clickedElement.dataset.id);

        // ۱. اگر روی 'input' در حالت ویرایش کلیک شد، کاری نکن.
        if (clickedElement.classList.contains('editing') && e.target.classList.contains('edit-input')) {
            return;
        }

        history.push(currentState); // ⬅️ ذخیره تاریخچه قبل از تغییر

        if (e.target.classList.contains('delete-btn')) {
            currentState = deleteTodo(currentState, todoId);
        }
        // ⬅️ تغییر مهم: '|| e.target.classList.contains('item-text')' حذف شد
        else if (e.target.classList.contains('complete-btn')) {
            // اگر روی دکمه تیک کلیک شد
            currentState = toggleTodo(currentState, todoId);
        } else {
            // اگر روی فضای خالی کلیک شد، تغییری نداریم. history را برمی‌گردانیم.
            history.pop();
            return;
        }

        // به‌روزرسانی‌های نهایی 
        saveState(currentState);
        renderTodoList(currentState, currentFilter);
        updateActiveCount(currentState);
        updateUndoButton(history);
    }



    const handleUndo = function () {

        let result = undo(history);

        currentState = result.newState;
        history = result.newHistory;

        saveState(currentState);
        renderTodoList(currentState, currentFilter);
        updateActiveCount(currentState);
        updateUndoButton(history);

    }


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


    const handleEditEnd = function (e) {

        const inputField = e.target;
        let listItem = e.target.closest('.todo-item');
        if (!listItem) return;


        const todoId = +listItem.dataset.id;
        const newText = inputField.value.trim();
        const oldText = listItem.querySelector('.item-text').textContent;


        if (e.type === 'keyup' && e.key === 'Escape') {
            inputField.value = oldText;

            listItem.classList.remove('editing')

            return
        }

        const shouldSave = (e.type === 'keyup' && e.key === 'Enter') || e.type === 'blur';


        if (!shouldSave) {
            return;
        }

        if (!listItem.classList.contains('editing')) return;

        let isUpdated = false;

        if (newText === '') {
            // 4a. حذف در صورت خالی بودن
            history.push(currentState);
            currentState = deleteTodo(currentState, todoId);
            isUpdated = true;
        } else if (newText !== listItem.querySelector('.item-text').textContent) {
            // 4b. ویرایش در صورت تغییر متن
            history.push(currentState);
            currentState = editTodo(currentState, todoId, newText);
            isUpdated = true;
        }


        listItem.classList.remove('editing');

        // 6. به‌روزرسانی UI فقط در صورت تغییر (بهینه‌سازی)
        if (isUpdated) {
            saveState(currentState);
            renderTodoList(currentState, currentFilter);
            updateActiveCount(currentState);
            updateUndoButton(history);
        }


    }

    const handleEditStart = function (e) {
        // ۱. پیدا کردن والد li و بررسی اینکه آیا روی آیتم کلیک شده است
        let listItem = e.target.closest('.todo-item');
        if (!listItem) return;

        // ۲. فیلتر: مطمئن می‌شویم که دابل‌کلیک روی span متن (item-text) رخ داده است
        if (e.target.classList.contains('item-text')) {

            // ۳. فعال کردن حالت ویرایش (CSS input را نمایش می‌دهد)
            listItem.classList.add('editing');

            // ۴. فوکوس و انتخاب متن داخل input
            const inputField = listItem.querySelector('.edit-input');
            inputField.focus();
            inputField.select(); // متن داخل را انتخاب می‌کند
        }
    }


    // اتصال keyup (برای Enter و Escape)
    todoList.addEventListener('keyup', (e) => {
        if (e.target.classList.contains('edit-input')) {
            handleEditEnd(e);
        }
    });

    // اتصال blur (برای از دست دادن فوکوس)
    todoList.addEventListener('blur', (e) => {
        if (e.target.classList.contains('edit-input')) {
            handleEditEnd(e);
        }
    }, true); // از مرحله Capture (true) استفاده می‌شود.



    // Evants

    addTodoBtn.addEventListener('click', handleInput);

    todoInput.addEventListener('keyup', (event) => {
        // اگر کلید فشرده شده، کلید Enter بود:
        if (event.key === 'Enter') {
            handleInput();
        }
    });

    todoList.addEventListener('click', handleTodoItemClick);
    undoButton.addEventListener('click', handleUndo)
    filterAll.addEventListener('click', handleFilterChange);
    filterActive.addEventListener('click', handleFilterChange);
    filterCompleted.addEventListener('click', handleFilterChange);
    todoList.addEventListener('dblclick', handleEditStart);

}

AppController();


