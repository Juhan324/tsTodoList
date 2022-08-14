function insertTodo(){
    let insert = document.getElementById("insert").value;
    if(insert.trim(" ") == ""){
        alert("일정을 입력해주세요.");
        return false;
    }
    localStorage.setItem(localStorage.length, insert);
    initialize(insert);
    document.getElementById("insert").value="";
};

function readTodo() {
    for (let index = 0; index < localStorage.length; index++) {
        let item = "";
        item = localStorage.getItem(index);
        if(item != null){
            initialize(item);
        }
    }
}

function initialize(item) {
    let tr = document.createElement("tr");
    let tdCheck = document.createElement("td");
    let td = document.createElement("td");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item;
    td.id = item;
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
    
    td.appendChild(document.createTextNode(item));
    tdCheck.appendChild(checkbox);
    tr.appendChild(tdCheck);
    tr.appendChild(td);
    document.getElementById("todoList").after(tr);
    if(localStorage.getItem(checkbox.id)=="true") {
        checkbox.checked = true;
        td.style.textDecorationLine="line-through";
        td.style.color="grey";
    }
}
