console.log("Started Index.js");

let toDoDetails = [];

const saveBtn = document.getElementById("saveBtn");
const toDoInput = document.getElementById("todoIp");

toDoInput.addEventListener("keyup",function callback(){
    console.log(toDoInput.value.length)
    if (! toDoInput.value.length){
        
        if (! saveBtn.classList.contains("disabled")){
            saveBtn.classList.add("disabled")
        }
    }
    else if (saveBtn.classList.contains("disabled")){
            saveBtn.classList.remove("disabled")
        }
});

// save the btn
saveBtn.addEventListener("click",() => {
    if (!toDoInput.value.length) return;
    toDoDetails.push(toDoInput.value); 
    const todoData = addTodo(toDoInput.value,toDoDetails.length);
    const toDoDetailsDiv = document.getElementById("todoDetails");
    toDoDetailsDiv.appendChild(todoData);
    toDoInput.value = "";
});

function addTodo(todoItem,todoCount){

    const rowDiv = document.createElement("div");
    const todoDataDiv = document.createElement("div");
    const todoNoDiv = document.createElement("div");
    const todoItemDiv = document.createElement("div");
    const todoStatusDiv = document.createElement("div");
    const todoActionsDiv = document.createElement("div");
    const hr = document.createElement("hr");
    const deleteBtn = document.createElement("button");
    const finishBtn = document.createElement("button");

    rowDiv.classList.add("row");
    todoDataDiv.classList.add("todo-data","justify-content-center");
    todoNoDiv.classList.add("todo-no");
    todoItemDiv.classList.add("todo-item")
    todoStatusDiv.classList.add("todo-status");
    deleteBtn.classList.add("btn","btn-danger");
    finishBtn.classList.add("btn","btn-success");
    todoActionsDiv.classList.add("todo-actions");

    todoNoDiv.textContent = todoCount;
    todoItemDiv.textContent = todoItem;
    todoStatusDiv.textContent = "In Progress";
    deleteBtn.textContent = "Delete";
    finishBtn.textContent = "Finished";

    todoActionsDiv.append(deleteBtn,finishBtn);
    todoDataDiv.append(todoNoDiv,todoItemDiv,todoStatusDiv,todoActionsDiv);
    rowDiv.append(todoDataDiv,hr);

    return rowDiv;
}