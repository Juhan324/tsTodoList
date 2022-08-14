function insertTodo(){
    let insert = document.getElementById("insert").value;
    let tr = document.createElement("tr");
    let tdCheck = document.createElement("td");
    let td = document.createElement("td");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = insert;
    td.id = insert;
    
    checkbox.onchange = function() {
        if(checkbox.checked){
            td.style.textDecorationLine="line-through";
            td.style.color="grey";
        }else {
            td.style.textDecorationLine="none";
            td.style.color="black";
        }
    };

    td.appendChild(document.createTextNode(insert));
    tdCheck.appendChild(checkbox);
    tr.appendChild(tdCheck);
    tr.appendChild(td);
    document.getElementById("todoList").after(tr);
    document.getElementById("insert").value="";
};