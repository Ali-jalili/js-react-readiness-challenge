import { getInitialState, saveState, addTodo, deleteTodo, toggleTodo, undo, editTodo } from "./state.js";

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

        const clickedElement = e.target.closest('[data-id]');
        if (!clickedElement) return;
        const todoId = Number(clickedElement.dataset.id);

        // ۱. اگر روی 'input' در حالت ویرایش کلیک شد، کاری نکن.
        if (clickedElement.classList.contains('editing') && e.target.classList.contains('edit-input')) {
            return;
        }

        history.push(currentState); // ⬅️ ذخیره تاریخچه قبل از تغییر

        if (e.target.classList.contains('delete-btn')) { // ⬅️ فرض می‌کنیم کلاس دکمه Delete، '.delete-btn' است (اگر در dom.js کلاس '.delete-todo' است، آن را جایگزین کنید).
            currentState = deleteTodo(currentState, todoId);
        } else if (e.target.classList.contains('complete-btn') || e.target.classList.contains('item-text')) {
            // اگر روی دکمه تیک یا متن کلیک شد
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



    const handleEditEnd = function (e) {
        // ... (کد handleEditEnd که در بالا نوشته شد)
        // ... (توضیحات در بالا، حذف مجدد برای کوتاهی)

        const inputField = e.target;
        const listItem = inputField.closest('.todo-item');
        const todoId = Number(listItem.dataset.id);
        const newText = inputField.value.trim();

        // 1. مدیریت لغو (Escape)
        if (e.type === 'keyup' && e.key === 'Escape') {
            inputField.value = listItem.querySelector('.item-text').textContent;
            listItem.classList.remove('editing');
            return;
        }

        // 2. بررسی شرط ذخیره (Enter یا Blur)
        const shouldSave = (e.type === 'keyup' && e.key === 'Enter') || e.type === 'blur';

        if (!shouldSave) {
            return;
        }

        // اگر آیتم قبلا در حالت ویرایش نبوده یا رویداد اشتباهی است، متوقف شو.
        if (!listItem.classList.contains('editing')) return;

        // 3. ذخیره تاریخچه قبل از هر تغییری
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

        // 5. خروج از حالت ویرایش (مهم: حتی اگر تغییر نکرده باشد)
        listItem.classList.remove('editing');

        // 6. به‌روزرسانی UI فقط در صورت تغییر (بهینه‌سازی)
        if (isUpdated) {
            saveState(currentState);
            renderTodoList(currentState, currentFilter);
            updateActiveCount(currentState);
            updateUndoButton(history);
        }
    };


    todoList.addEventListener('click', handleTodoItemClick);
    todoList.addEventListener('dblclick', handleEditStart);

    // اتصال رویدادهای پایان ویرایش به لیست والد
    // توجه: ما از Event Delegation برای keyup و blur روی فیلد input استفاده می‌کنیم.
    todoList.addEventListener('keyup', (e) => {
        if (e.target.classList.contains('edit-input')) {
            handleEditEnd(e);
        }
    });

    todoList.addEventListener('blur', (e) => {
        if (e.target.classList.contains('edit-input')) {
            handleEditEnd(e);
        }
    }, true);


}

AppController();



