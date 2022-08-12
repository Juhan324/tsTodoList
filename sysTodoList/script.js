function insertTodo(){
    let insert = document.getElementById("insert").value;
    let tr = document.createElement("tr");
    let tdCheck = document.createElement("td");
    let td = document.createElement("td");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = insert;
    td.appendChild(document.createTextNode(insert));
    tdCheck.appendChild(checkbox);
    tr.appendChild(tdCheck);
    tr.appendChild(td);
    document.getElementById("todoList").after(tr);
};

function complete(){
}