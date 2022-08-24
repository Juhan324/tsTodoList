function autoincrement(){
    if(localStorage.getItem("number") == null){
        localStorage.setItem("number", 0);
    }
    localStorage.setItem("number",Number(localStorage.getItem("number"))+1);
    return localStorage.getItem("number");
}



function insertTodo(){
    let insert = {
        value : document.getElementById("insert").value,
        checked : false
    }
    if(insert.value.trim() == ""){
        alert("일정을 입력해주세요.");
        return false;
    }
    for(let i = 0; i < localStorage.length; i++){
        if(insert.value == JSON.parse(localStorage.getItem(localStorage.key(i))).value){
            alert("이미 입력된 일정입니다.");
            return false;
        }
    }
    let key = autoincrement();
    localStorage.setItem(key, JSON.stringify(insert));
    initialize(key, JSON.stringify(insert));
    document.getElementById("insert").value="";
    return false;
};



function readTodo() {
    let list = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if(key!="number"){
            list.push(key);
        }
    }
    list.sort(function(a, b)  {
        return Number(a)-Number(b);
    });

    for (let index = 0; index < list.length; index++) {
        let item = localStorage.getItem(list[index]);
        if(item != null && item != "true" && item != "false" && list[index] != "number"){
            initialize(list[index], item);
        }
    }
}



function initialize(key, item) {
    let item2 = JSON.parse(item);
    let td = document.createElement("td");
    td.id = item2.value;
    td.className = "todoList";
    td.appendChild(document.createTextNode(item2.value));

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.ariaLabel = item2.value;

    checkbox.onchange = function() {
        if(checkbox.checked){
            item2.checked = true;
            document.getElementById(item2.value).classList.add("checked");
            localStorage.setItem(key, JSON.stringify(item2));
        }else {
            item2.checked = false;
            document.getElementById(item2.value).classList.remove("checked");
            localStorage.setItem(key, JSON.stringify(item2));
        }
    };
    
    let deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.className = "delete button";
    deleteButton.value = "[x]";
    deleteButton.id = item2.value+"delete";

    let tdCheck = document.createElement("td");
    tdCheck.appendChild(checkbox);
    tdCheck.className = "tdCheck";

    let tdDelete = document.createElement("td");
    tdDelete.appendChild(deleteButton);
    tdDelete.className = "tdDelete";

    let tr = document.createElement("tr");
    tr.appendChild(tdCheck);
    tr.appendChild(td);
    tr.appendChild(tdDelete);
    tr.id = item2.value+"list";
    document.getElementById("todoList").after(tr);

    deleteButton.addEventListener("click", deleteTodo);

    if(item2.checked == true) {
        checkbox.checked = true;
        document.getElementById(item2.value).classList.add("checked");
    }
}



function deleteTodo(item) {
    let del = item.currentTarget.id.slice(0,-6);
    for(let i=0; i<localStorage.length; i++){
        if(JSON.parse(localStorage.getItem(localStorage.key(i))).value == del){
            localStorage.removeItem(localStorage.key(i));
            document.getElementById(del+"list").remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', readTodo());