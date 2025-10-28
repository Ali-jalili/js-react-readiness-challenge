import { getInitialState, saveState, addTodo, deleteTodo, toggleTodo, undo } from "./state.js";

import { todoInput, addTodoBtn, todoList, undoButton, renderTodoList, updateActiveCount, updateUndoButton, filterAll, filterActive, filterCompleted } from "./dom.js";


let currentState = getInitialState()
const history = []
const currentFilter = 'all'


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

}

AppController();



