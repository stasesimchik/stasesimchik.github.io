let tasksList = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];

const DATA = JSON.parse(localStorage.getItem('list'));
for( let key in DATA){
  let info = (DATA[key]);
  let text = info.text;
  let title = info.title;
  let color = info.color;
  let radio = info.radio;
  let dateValue = info.date;
  taskAdd(text, title, radio, color, dateValue);
};

let navbar = document.querySelector('.navbar');
colorPage.onchange = function() {
    navbar.classList.remove('bg-light');
    navbar.style.background = colorPage.value;
}    
navbar.style.background = colorPage.value;
let addTask = document.querySelector('.btn-task');
addTask.addEventListener('click', createTask);

function createTask() {
    let form = document.forms.form;
    let title = form.elements.title.value;
    let text = form.elements.text.value;
    let radio = form.elements.gridRadios.value;
    let date = new Date();
    let dateValue = date.toLocaleTimeString() + ' ' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    let color = form.elements.color.value;

    tasksList.push({text: text,
                    title: title,
                    radio: radio,
                    color: color,
                    date: dateValue});
    localStorage.setItem('list', JSON.stringify(tasksList));
    taskAdd(text, title, radio, color, dateValue);
};

function taskAdd(text, title, radio, color, dateValue) {
    let listGroup = document.getElementById('currentTasks');
    let listGroupItem = document.createElement('li');
    listGroupItem.style.background = color;
    listGroupItem.classList.add('list-group-item', 'd-flex','w-100', 'mb-2' );
    listGroupItem.innerHTML = `<div class="w-100 mr-2">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${title}</h5>
            <div>
                <small class="mr-2">${radio}</small>
                <small>${dateValue}</small>
            </div>

        </div>
        <p class="mb-1 w-100">${text}</div>
    <div class="dropdown m-2 dropleft">
        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
        </button>
        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
            <button type="button" class="btn btn-success w-100">Complete</button>
            <button type="button" class="btn btn-info w-100 my-2">Edit</button>
            <button type="button" class="btn btn-danger w-100">Delete</button>
        </div>
    </div>`;
    listGroup.append(listGroupItem);

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
};

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
    getQuantity();
    getCompleted();
    removeEdit();
};

function editItem() {
    let currentItem = this.parentNode.parentNode.parentNode;
    for(let i = 0; i < currentItem.querySelectorAll('.mb-1').length; i++){
        currentItem.querySelectorAll('.mb-1')[i].setAttribute('contenteditable', true);
    }
};

function deleteItem(){
    let currentItem = this.parentNode.parentNode.parentNode;
    let title = currentItem.querySelector('.mb-1').textContent;
    for(let i =0; i < tasksList.length;i++){
        if(tasksList[i].title == title) {
        tasksList.splice(i, 1);
        localStorage.setItem('list', JSON.stringify(tasksList));
        };
    };    
    currentItem.remove();
    getQuantity();
    getCompleted()
};

let ascending = document.querySelector('.ascending').addEventListener('click', sortByDate);
let descending = document.querySelector('.descending').addEventListener('click', sortByDate)

function sortByDate() {
    let listGroup = document.getElementById('currentTasks');
    let listGroupItems = document.querySelectorAll('.list-group-item');
    for(let i = 0; i < listGroupItems.length; i++) {
        listGroup.prepend(listGroupItems[i]);
    };
}

function removeEdit() {
    let btnEdit = completedTasks.querySelectorAll('.btn-info');
    for(let i = 0; i < btnEdit.length; i++) {
        btnEdit[i].removeEventListener('click', editItem);
    };
};