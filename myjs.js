let list = [
    {
        id: 0,
        task: "Make coffee",
        completed: false
    },
    {
        id: 1,
        task: "Make tea",
        completed: true
    }
]
let i = 2;
let tasks = document.getElementById("tasks");
let inp = document.getElementById("inp");
let btnAdd = document.getElementById("btnAdd");

if (localStorage.getItem("list") != null) {
    let store = localStorage.getItem("list");
    list = JSON.parse(store);
}

inp.onkeypress = (e) => {
    if (e.key === "Enter") {
        add();
    }
}
btnAdd.onclick = () => {
    add();
}

function add() {
    if (inp.value != "") {
        list.push({ id: i++, task: inp.value, completed: false });
        localStorage.setItem("list", JSON.stringify(list));
        inp.value = "";
        display();
    }
}



function display() {
    tasks.innerHTML = "";

    list.forEach((todo, i) => {
        let d = document.createElement("div");
        d.className = "items";
        let cb = document.createElement("input");
        let del = document.createElement("button");
        let li = document.createElement("li");

        del.innerText = "Delete task";
        cb.type = "checkbox";
        cb.checked = todo.completed;
        li.innerText = todo.task;
        if (list[i].completed == true) {
            li.style.textDecoration = "line-through";
        }
        else {
            li.style.textDecoration = "none";
        }

        cb.onchange = () => {
            list[i].completed = cb.checked;
            localStorage.setItem("list", JSON.stringify(list));
            if (list[i].completed == true) {
                li.style.textDecoration = "line-through";
            }
            else {
                li.style.textDecoration = "none";
            }

        }

        del.onclick = () => {
            deleteTask(i);
        }

        d.append(cb, li, del);
        tasks.appendChild(d);
    });
}

function deleteTask(id) {
    list.splice(id, 1);
    localStorage.setItem("list", JSON.stringify(list));
    display();
}

display();
