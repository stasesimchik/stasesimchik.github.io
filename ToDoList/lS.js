export function getTasksFromLS() {
    const DATA = JSON.parse(localStorage.getItem('list'));
    for( let key in DATA){
    let info = (DATA[key]);
    let text = info.text;
    let title = info.title;
    let color = info.color;
    let radio = info.radio;
    let dateValue = info.date;
    let taskId = info.taskId;
    let complete = info.complete;
    taskAdd(text, title, radio, color, dateValue,taskId, complete);
    };
}
