function getQuantity() {
    let quantity = document.querySelector('.quantity');
    let listGroup = document.getElementById('currentTasks');
    if(listGroup.childElementCount == 0) {
        quantity.textContent = '';    
    }else {
        quantity.textContent = '(' + listGroup.childElementCount + ')';
    }
};

function getCompleted() {
    let completed = document.querySelector('.completed');
    let listGroup = document.getElementById('completedTasks');
    if(listGroup.childElementCount == 0) {
        completed.textContent = '';    
    }else {
        completed.textContent = '(' + listGroup.childElementCount + ')';
    }
};

function completeItem() {
    let currentItem = this.parentNode.parentNode.parentNode;
    let completedTasks = document.getElementById('completedTasks');
    completedTasks.append(currentItem);
    for(let i =0; i < tasksList.length;i++){
        if(tasksList[i].taskId == currentItem.id) {
        tasksList[i].complete = true;
        localStorage.setItem('list', JSON.stringify(tasksList));
        };
    };    
  
    getQuantity();
    getCompleted();
    removeEdit();
};

function editItem() {
    exampleModalLabel.textContent = 'Edit task';
    formBtn.textContent = 'Save';

    let currentItem = this.parentNode.parentNode.parentNode;

    title = currentItem.querySelector('.taskTitle').innerHTML;
    form.elements.title.value = title;
    text = currentItem.querySelector('.taskText').innerHTML;
    form.elements.text.value = text;
    radio = currentItem.querySelector('.taskRadio').innerHTML;

    switch (radio) {
        case 'Low':
            Low.checked;
            break;
        case 'Medium':
            Medium.checked = true;
            break;    
        case 'High':
            High.checked = true;
            break;    
    }

   let btnEdit = currentItem.querySelector('.btn-info');
   let editedItemDel = deleteItem.bind(btnEdit);

   editedItemDel();
};

function deleteItem(){
    let currentItem = this.parentNode.parentNode.parentNode;
    console.log(currentItem);
    for(let i =0; i < tasksList.length;i++){
        if(tasksList[i].taskId == currentItem.id) {
        tasksList.splice(i, 1);
        localStorage.setItem('list', JSON.stringify(tasksList));
        };
    };    
    currentItem.remove();
    getQuantity();
    getCompleted()
};

function sortByDate() {
    let currentItems = currentTasks.querySelectorAll('li');
    for(i = 0; i < currentItems.length; i++) {
        currentTasks.prepend(currentItems[i]);
    };
    
    let completedItems = completedTasks.querySelectorAll('li');
    for(i = 0; i < completedItems.length; i++) {
        completedTasks.prepend(completedItems[i]);
    };
}
function removeEdit() {
    let btnEdit = completedTasks.querySelectorAll('.btn-info');
    for(let i = 0; i < btnEdit.length; i++) {
        btnEdit[i].remove();
    };
    
    let btnComplete = completedTasks.querySelectorAll('.btn-success');
    for(let i = 0; i < btnComplete.length; i++) {
        btnComplete[i].remove();
    };
};

function taskAdd(text, title, radio, color, dateValue, taskId, complete) {
    let listGroup = document.getElementById('currentTasks');
    let listGroupItem = document.createElement('li');
    listGroupItem.id = taskId;
    listGroupItem.style.background = color;
    listGroupItem.classList.add('list-group-item', 'd-flex','w-100', 'mb-2' );
    listGroupItem.innerHTML = `<div class="w-100 mr-2">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1 taskTitle">${title}</h5>
            <div>
                <small class="mr-2 taskRadio">${radio}</small>
                <small class="taskDate">${dateValue}</small>
            </div>

        </div>
        <p class="mb-1 w-100 taskText">${text}</div>
    <div class="dropdown m-2 dropleft">
        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
        </button>
        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
            <button type="button" class="btn btn-success w-100">Complete</button>
            <button type="button" class="btn btn-info w-100 my-2" data-toggle="modal" data-target="#exampleModal">Edit</button>
            <button type="button" class="btn btn-danger w-100">Delete</button>
        </div>
    </div>`;
    if(complete != true) {
        listGroup.append(listGroupItem);
    }else{
        completedTasks.append(listGroupItem);
        removeEdit();
    }

    let btnComplete = document.querySelectorAll('.btn-success');
    for(let i = 0; i < btnComplete.length; i++) {
        btnComplete[i].addEventListener('click', completeItem);
    };
    let btnEdit = document.querySelectorAll('.btn-info');
    for(let i = 0; i < btnEdit.length; i++) {
        btnEdit[i].addEventListener('click', editItem);
    };
    let btnDelete = document.querySelectorAll('.btn-danger');
    for(let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener('click', deleteItem);
    };

    getQuantity();
    getCompleted();
    
};

function createTask() {
    exampleModalLabel.textContent = 'Add task';
    formBtn.textContent = 'Add task';

    let form = document.forms.form;
    let title = form.elements.title.value;
    let text = form.elements.text.value;
    let radio = form.elements.gridRadios.value;
    let date = new Date();
    let dateValue = date.toLocaleTimeString() + ' ' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    let color;
    
    switch(radio) {
        case 'Low':
            color = '#faeecd';
            break;
        case 'Medium':
            color = '#e1f5f4';
            break;
        case 'High':
            color = '#e4c3e8';
            break;        
    }

    let taskId = Number(date);
    let complete = false;
    
    tasksList.push({text,
                    title,
                    radio,
                    color,
                    taskId,
                    complete,
                    date: dateValue});
    localStorage.setItem('list', JSON.stringify(tasksList));

    taskAdd(text, title, radio, color, dateValue,taskId, complete);
    form.reset();
};





let tasksList = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];


let navbar = document.querySelector('.navbar');
colorPage.onchange = function() {
    navbar.classList.remove('bg-light');
    navbar.style.background = colorPage.value;
}    
navbar.style.background = colorPage.value;
let addTask = document.querySelector('.btn-task');
addTask.addEventListener('click', createTask);

let ascending = document.querySelector('.ascending').addEventListener('click', sortByDate);
let descending = document.querySelector('.descending').addEventListener('click', sortByDate)

