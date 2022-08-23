function autoincrement() : string{
    if(localStorage.getItem("number") == null){
        localStorage.setItem("number", "0");
    }
    localStorage.setItem("number",(Number(localStorage.getItem("number"))+1).toString());
    return <string>localStorage.getItem("number");
}


function insertTodo() : boolean{
    let insertValue = (<HTMLInputElement>document.getElementById("insert")).value;

    interface insert {
        value : string,
        checked : boolean
    }

    let insert : insert = {
        value : insertValue,
        checked : false
    }

    if(insert.value.trim() == ""){
        alert("일정을 입력해주세요.");
        return false;
    }
    for(let i = 0; i < localStorage.length; i++){
        if(insert.value == JSON.parse(<string>localStorage.getItem(<string>localStorage.key(i))).value){
            alert("이미 입력된 일정입니다.");
            return false;
        }
    }
    let key : string = autoincrement();
    localStorage.setItem(key, JSON.stringify(insert));
    initialize(key, JSON.stringify(insert));
    insertValue="";
    return false;
};



function readTodo() : void {
    let list : Array<string> = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key : string = <string>localStorage.key(i);
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



function initialize(key : string, item : string) : void{
    const item2 = JSON.parse(item);
    const td = document.createElement("td");
    td.id = item2.value;
    td.className = "todoList";
    td.appendChild(document.createTextNode(item2.value));

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.ariaLabel = item2.value;

    const elementCheckbox : HTMLInputElement = <HTMLInputElement>document.getElementById(item2.value)

    checkbox.onchange = function() : void {
        if(checkbox.checked){
            item2.checked = true;
            elementCheckbox.classList.add("checked");
            localStorage.setItem(key, JSON.stringify(item2));
        }else {
            item2.checked = false;
            elementCheckbox.classList.remove("checked");
            localStorage.setItem(key, JSON.stringify(item2));
        }
    };
    
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.className = "delete button";
    deleteButton.value = "[x]";
    deleteButton.id = item2.value+"delete";

    const tdCheck = document.createElement("td");
    tdCheck.appendChild(checkbox);
    tdCheck.className = "tdCheck";

    const tdDelete = document.createElement("td");
    tdDelete.appendChild(deleteButton);
    tdDelete.className = "tdDelete";

    const tr = document.createElement("tr");
    tr.appendChild(tdCheck);
    tr.appendChild(td);
    tr.appendChild(tdDelete);
    tr.id = item2.value+"list";
    (<HTMLTableRowElement>document.getElementById("todoList")).after(tr);

    deleteButton.addEventListener("click", deleteTodo);

    if(item2.checked == true) {
        checkbox.checked = true;
        (<HTMLInputElement>document.getElementById(item2.value)).classList.add("checked");
    }
}

function test(number:Number) {
    for(let i=0; i<number; i++){
        (<HTMLInputElement>document.getElementById("insert")).value = i.toString();
        insertTodo();
    }
}



function deleteTodo(item : MouseEvent) : void{
    const del = (<HTMLTableRowElement>item.target).id.slice(0,-6);
    for(let i=0; i<localStorage.length; i++){
        if(JSON.parse(<string>localStorage.getItem(<string>localStorage.key(i))).value == del){
            localStorage.removeItem(<string>localStorage.key(i));
            (<HTMLTableRowElement>document.getElementById(del+"list")).remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', readTodo);