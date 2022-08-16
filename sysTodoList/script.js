function autoincrement(){
    if(localStorage.getItem("number") == null){
        localStorage.setItem("number", 0);
    }
    localStorage.setItem("number",Number(localStorage.getItem("number"))+1);
    return localStorage.getItem("number");
}

function insertTodo(){
    let insert = document.getElementById("insert").value;
    if(insert.trim(" ") == ""){
        alert("일정을 입력해주세요.");
        return false;
    }
    for(let i = 0; i < localStorage.length; i++){
        if(insert == localStorage.getItem(localStorage.key(i))){
            alert("이미 입력된 일정입니다.");
            return false;
        }
    }
    localStorage.setItem(autoincrement(), insert);
    document.getElementById("insert").value="";
};

function readTodo() {
    let list = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        list.push(key);
    }
    list.sort(function(a, b)  {
        a = Number(a);
        b = Number(b);
        return a-b;
    });

    for (let index = 0; index < list.length; index++) {
        let item = localStorage.getItem(list[index]);
        if(item != null && item != "true" && item != "false" && list[index] != "number"){
            initialize(item);
        }
    }
}



function initialize(item) {
    let td = document.createElement("td");
    td.id = item;
    td.className = "todoList";
    td.appendChild(document.createTextNode(item));

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item+"check";
    checkbox.ariaLabel = item;

    checkbox.onchange = function() {
        if(checkbox.checked){
            td.style.textDecorationLine="line-through";
            td.style.color="grey";
        }else {
            td.style.textDecorationLine="none";
            td.style.color="black";
        }
        localStorage.setItem(checkbox.id, checkbox.checked);
    };
    
    let deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.id = item+"delete";
    deleteButton.className = "delete";
    deleteButton.value = "[x]";

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
    tr.id = item+"list";
    document.getElementById("todoList").after(tr);

    deleteButton.addEventListener("click", deleteTodo);

    if(localStorage.getItem(checkbox.id)=="true") {
        checkbox.checked = true;
        td.style.textDecorationLine="line-through";
        td.style.color="grey";
    }
}



function deleteTodo(item) {
    var del = item.currentTarget.id.slice(0,-6);
    localStorage.removeItem(del+"check");
    for(var i=0; i<localStorage.length; i++){
        if(localStorage.getItem(localStorage.key(i)) == del){
            localStorage.removeItem(localStorage.key(i));
            document.getElementById(del+"list").remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', readTodo());