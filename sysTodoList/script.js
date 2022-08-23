function autoincrement() {
    if (localStorage.getItem("number") == null) {
        localStorage.setItem("number", "0");
    }
    localStorage.setItem("number", (Number(localStorage.getItem("number")) + 1).toString());
    return localStorage.getItem("number");
}
function insertTodo() {
    var insertValue = document.getElementById("insert").value;
    var insert = {
        value: insertValue,
        checked: false
    };
    if (insert.value.trim() == "") {
        alert("일정을 입력해주세요.");
        return false;
    }
    for (var i = 0; i < localStorage.length; i++) {
        if (insert.value == JSON.parse(localStorage.getItem(localStorage.key(i))).value) {
            alert("이미 입력된 일정입니다.");
            return false;
        }
    }
    var key = autoincrement();
    localStorage.setItem(key, JSON.stringify(insert));
    initialize(key, JSON.stringify(insert));
    insertValue = "";
    return false;
}
;
function readTodo() {
    var list = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key != "number") {
            list.push(key);
        }
    }
    list.sort(function (a, b) {
        return Number(a) - Number(b);
    });
    for (var index = 0; index < list.length; index++) {
        var item = localStorage.getItem(list[index]);
        if (item != null && item != "true" && item != "false" && list[index] != "number") {
            initialize(list[index], item);
        }
    }
}
function initialize(key, item) {
    var item2 = JSON.parse(item);
    var td = document.createElement("td");
    td.id = item2.value;
    td.className = "todoList";
    td.appendChild(document.createTextNode(item2.value));
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.ariaLabel = item2.value;
    var elementCheckbox = document.getElementById(item2.value);
    checkbox.onchange = function () {
        if (checkbox.checked) {
            item2.checked = true;
            elementCheckbox.classList.add("checked");
            localStorage.setItem(key, JSON.stringify(item2));
        }
        else {
            item2.checked = false;
            elementCheckbox.classList.remove("checked");
            localStorage.setItem(key, JSON.stringify(item2));
        }
    };
    var deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.className = "delete button";
    deleteButton.value = "[x]";
    deleteButton.id = item2.value + "delete";
    var tdCheck = document.createElement("td");
    tdCheck.appendChild(checkbox);
    tdCheck.className = "tdCheck";
    var tdDelete = document.createElement("td");
    tdDelete.appendChild(deleteButton);
    tdDelete.className = "tdDelete";
    var tr = document.createElement("tr");
    tr.appendChild(tdCheck);
    tr.appendChild(td);
    tr.appendChild(tdDelete);
    tr.id = item2.value + "list";
    document.getElementById("todoList").after(tr);
    deleteButton.addEventListener("click", deleteTodo);
    if (item2.checked == true) {
        checkbox.checked = true;
        document.getElementById(item2.value).classList.add("checked");
    }
}
function test(number) {
    for (var i = 0; i < number; i++) {
        document.getElementById("insert").value = i.toString();
        insertTodo();
    }
}
function deleteTodo(item) {
    var del = item.target.id.slice(0, -6);
    for (var i = 0; i < localStorage.length; i++) {
        if (JSON.parse(localStorage.getItem(localStorage.key(i))).value == del) {
            localStorage.removeItem(localStorage.key(i));
            document.getElementById(del + "list").remove();
        }
    }
}
document.addEventListener('DOMContentLoaded', readTodo);
