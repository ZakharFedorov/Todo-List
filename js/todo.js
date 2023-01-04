const addButton = document.getElementById('add');
const logoutButton = document.getElementById('logout');
const inputTask = document.getElementById('new-task');
const unfinishedTasks = document.getElementById('unfinished-tasks');
const finishedTasks = document.getElementById('finished-tasks');
let UserLogin = true
let userid

// Funkce odhlášení z účtu.
// Přesune na přihlašovací stránku.
function LogOut() {
    window.location.replace("./");
}


// Funkce vytvoří nový to-do element, který bude sestávat z checkboxa (vyřízený/nevyřízený úkol),
// labela (popis úkolu), inputa, delete Button (tlačítko pro odstranění úkolu)
// a editButton (tlačítko pro upravu popisu a uložení upraveného popisu úkolu).
// Funkce obsahuje task argument který představuje popis úkolu a finished argument který odpovídá za stáv splnění elementu.
function createNewElement(task, finished) {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('button');

    if(finished){
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
    }else {
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
    }


    const label = document.createElement('label');
    label.innerText = task;
    const input = document.createElement('input');
    input.type = "text";
    const editButton = document.createElement('button');
    editButton.className = "material-icons edit";
    editButton.innerHTML = "<i class='material-icons'>edit</i>";
    const deleteButton = document.createElement('button');
    deleteButton.className = "material-icons delete";
    deleteButton.innerHTML = "<i class='material-icons'>delete</i>";

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    return listItem;
}


// Funkce přidá nový to-do element do html kodu a databazy.
// Funkce obsahuje ifLoggedUser argument který představuje pravdivost o autorizaci uživatele 
// a InputedTask argument který představuje text napsaný v input elementu.
function addTask(ifLoggedUser, InputedTask) {
    let listItem
    if (ifLoggedUser){
        if (InputedTask !== '') {
            db.collection("todo-items").add({
                description: InputedTask,
                finished: false,
                uid: userid
            })
    
            listItem = createNewElement(InputedTask, false);
            unfinishedTasks.appendChild(listItem);
            bindTaskEvents(listItem, finishTask)
    
            inputTask.value = "";
        }
    }
    return listItem.parentElement;
}

// Funkce odstraňuje existující to-do element
function deleteTask() {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    const id = listItem.getAttribute('data-id');
    ul.removeChild(listItem);
    db.collection("todo-items").doc(id).delete();
}

// Funkce mění popis to-do elementu a ukládá změnu do databazy.
// Funkce popisuje dva stavy (běžný a editMode) to-do elementu.
// Běžný - da se jen čist popis elementu.
// editMode - vzniká možnost změny obsahu popisa a tlačítko Upravit se stane tlačítkem Uložit
function editTask() {
    const editButton = this;
    const listItem = this.parentNode;
    const label = listItem.querySelector('label');
    const input = listItem.querySelector('input[type=text]');
    const containsClass = listItem.classList.contains('editMode');

    const id = listItem.getAttribute('data-id');
    const item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if (containsClass) {
                label.innerText = input.value;
                editButton.className = "material-icons edit";
                editButton.innerHTML = "<i class='material-icons'>edit</i>";
        
                const id = listItem.getAttribute('data-id');
                db.collection("todo-items").doc(id).update('description', input.value);
            } else {
                input.value = label.innerText;
                editButton.className = "material-icons save";
                editButton.innerHTML = "<i class='material-icons'>save</i>";
        
            }
            listItem.classList.toggle('editMode');
        }
    })
}

// Mění stav z nevyřízený na vyřízený a ukladá to do html kodu a databazy
function finishTask() {
    const listItem = this.parentNode;
    const id = listItem.getAttribute('data-id');
    const item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            item.update('finished', true);

            const checkbox = listItem.querySelector('button.checkbox');
            checkbox.className = "material-icons checkbox";
            checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
            finishedTasks.appendChild(listItem);
            bindTaskEvents(listItem, unfinishTask);
        }
    })
    return listItem
}

// Mění stav z vyřízený na nevyřízený a ukladá to do html kodu a databazy
function unfinishTask() {
    const listItem = this.parentNode;
    const id = listItem.getAttribute('data-id');
    const item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            item.update('finished', false);

            const checkbox = listItem.querySelector('button.checkbox');
            checkbox.className = "material-icons checkbox";
            checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
            unfinishedTasks.appendChild(listItem);
            bindTaskEvents(listItem, finishTask)
        }
    })
    return listItem
}

// Funkce, která nám umožňuje cílit na element, který předáme do parametru listItem
// s funkcí v parametru checkboxEvent, která aplikuje určitou akci.
function bindTaskEvents(listItem, checkboxEvent) {
    const checkbox = listItem.querySelector('button.checkbox');
    const editButton = listItem.querySelector('button.edit');
    const deleteButton = listItem.querySelector('button.delete');

    checkbox.onclick = checkboxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;

}

// Funkce, která stahuje data z databazy
function loadItems(){
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        generateItems(items)
    })
}

// Funkce, která generuje načtená data z databazy.
function generateItems(items){
    unfinishedTasks.replaceChildren();
    finishedTasks.replaceChildren();
    let unfinishedTasksArr = [];
    let finishedTasksArr = [];
    let dataID_unfinishedTasksArr = []
    let dataID_finishedTasksArr = []
    items.forEach((item) => {
        if(item.uid == userid){
            if(item.finished == false){
                unfinishedTasksArr.push(item.description)
                dataID_unfinishedTasksArr.push(item.id)
            }else{
                finishedTasksArr.push(item.description)
                dataID_finishedTasksArr.push(item.id)
            }
        }
    })
    const data = {
        unfinishedTasks: unfinishedTasksArr,
        finishedTasks: finishedTasksArr
    }
    let listItem
    for(let i=0; i<data.unfinishedTasks.length;i++){
        listItem=createNewElement(data.unfinishedTasks[i], false);
        listItem.setAttribute('data-id', dataID_unfinishedTasksArr[i])
        unfinishedTasks.appendChild(listItem);
        bindTaskEvents(listItem, finishTask);
    }
    
    for(let i=0; i<data.finishedTasks.length; i++){
        listItem=createNewElement(data.finishedTasks[i], true);
        listItem.setAttribute('data-id', dataID_finishedTasksArr[i])
        finishedTasks.appendChild(listItem);
        bindTaskEvents(listItem, unfinishTask);
    }
    return data
}

// Inicializuje některé prvky
function init(){
    
    // Získání aktuálního přihlášeného uživatele
    auth.onAuthStateChanged((user) => {
        if (user) {
          userid = user.uid;
        } else {
            UserLogin = false
          // User is signed out
        }
    });

    logoutButton.onclick = LogOut;
    addButton.addEventListener("click", () => addTask(UserLogin, inputTask.value))

    if (UserLogin){
        loadItems()
    }
}

init()


module.exports = {createNewElement, addTask, finishTask, unfinishTask, editTask};