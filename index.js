console.log("Started Index.js");

let toDoDetails = [];

const saveBtn = document.getElementById("saveBtn");
const toDoInput = document.getElementById("todoIp");
const toDoListDiv = document.getElementById("todo-list");
const getTodoBtn = document.getElementById("getBtn");
getTodoBtn.onclick = getPendingTodos;

toDoInput.addEventListener("keyup",function callback(){
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
    toDoDetails.push({todoText:toDoInput.value,status:"In Progress",finishedBtnText:"Finished"}); 
    addTodo({todoText:toDoInput.value,status:"In Progress",finishedBtnText:"Finished"},toDoDetails.length);
    toDoInput.value = "";
    if (! saveBtn.classList.contains("disabled")){
        saveBtn.classList.add("disabled")
    }
});


function toggleTodo(event){
    toDoListDiv.innerHTML = "";
    const element = event.target;
    const index = element.getAttribute("index");
    if (toDoDetails[index].finishedBtnText === "Finished"){
        toDoDetails[index].finishedBtnText = "Undo";
        toDoDetails[index].status = "Completed";
    }
    else{
        toDoDetails[index].finishedBtnText = "Finished";
        toDoDetails[index].status = "In Progress";
    }

    toDoDetails.sort((a,b)=>{
        if (a.status === "In Progress"){
            return -1;
        }
    })
    toDoDetails.forEach((todo,index)=>addTodo(todo,index+1));
}

function deleteTodo(event){
    toDoListDiv.innerHTML = "";
    const element = event.target;
    const index = element.getAttribute("index");
    toDoDetails.splice(index,1);
    toDoDetails.forEach((todo,index)=>addTodo(todo,index+1));
};

function editTodo(event){
    const editButton = event.target;
    const indexToEdit = editButton.getAttribute("index");
    const todoItemDiv = document.querySelector(`div[index="${indexToEdit}"]`);
    const hiddenInput = document.querySelector(`input[index="${indexToEdit}"]`);
    todoItemDiv.style.display= "none";
    hiddenInput.type = "text";
    hiddenInput.value = todoItemDiv.textContent;
};

function saveEditTodo(event){
    if (event.keyCode === 13){
        const saveInput = event.target;
        const indexToSave = saveInput.getAttribute("index");
        const todoItemDiv = document.querySelector(`div[index="${indexToSave}"]`);
        const hiddenInput = document.querySelector(`input[index="${indexToSave}"]`);
        todoItemDiv.style.display= "block";
        todoItemDiv.textContent =  hiddenInput.value;
        hiddenInput.type = "hidden";
        hiddenInput.value = "";
    }
}

function getPendingTodos(){
    toDoDetails = toDoDetails.filter(todo => todo.status!=="Completed");
    console.log(toDoDetails);
    toDoListDiv.innerHTML = "";
    toDoDetails.forEach((todo,index)=>addTodo(todo,index+1));
}

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
    const editBtn = document.createElement("button");
    const hiddenInput = document.createElement("input");
    
    deleteBtn.onclick = deleteTodo;
    finishBtn.onclick = toggleTodo;
    editBtn.onclick = editTodo;
    hiddenInput.onkeydown = saveEditTodo;

    deleteBtn.setAttribute("index",todoCount-1);
    finishBtn.setAttribute("index",todoCount-1);
    editBtn.setAttribute("index",todoCount-1);
    hiddenInput.setAttribute("index",todoCount-1);
    todoItemDiv.setAttribute("index",todoCount-1);

    hiddenInput.type = "hidden";

    rowDiv.classList.add("row");
    todoDataDiv.classList.add("todo-data","justify-content-center");
    todoNoDiv.classList.add("todo-no");
    todoItemDiv.classList.add("todo-item","todo-data");
    hiddenInput.classList.add("form-control","todo-item");
    todoStatusDiv.classList.add("todo-status");
    deleteBtn.classList.add("btn","btn-danger");
    finishBtn.classList.add("btn","btn-success");
    editBtn.classList.add("btn","btn-warning");
    todoActionsDiv.classList.add("todo-actions","d-flex","gap-2");

    todoNoDiv.textContent = todoCount;
    todoItemDiv.textContent = todoItem.todoText;
    todoStatusDiv.textContent = todoItem.status;
    deleteBtn.textContent = "Delete";
    finishBtn.textContent = todoItem.finishedBtnText;
    editBtn.textContent = "Edit";

    todoActionsDiv.append(deleteBtn,finishBtn,editBtn);
    todoDataDiv.append(todoNoDiv,todoItemDiv,hiddenInput,todoStatusDiv,todoActionsDiv);
    rowDiv.append(todoDataDiv,hr);
    toDoListDiv.appendChild(rowDiv);
}