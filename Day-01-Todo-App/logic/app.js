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

        currentState = addTodo(currentState, textInputTodo);

        saveState(currentState);

        renderTodoList(currentState, currentFilter);

        updateActiveCount()

        todoInput.value = ''









    }


    addTodoBtn.addEventListener('click', handleInput)

}

AppController();



addTodoBtn.addEventListener('click', function () {
    let textInput = todoInput.value;

    if (textInput.value === '') {
        alert('فیلد ورودی خالی است')
    }

    addTodo(currentState)
})