/**
 * @jest-environment jsdom
 */
const {createNewElement, addTask, finishTask, unfinishTask, editTask} = require('../js/todo')


test('create New Element', () => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('button');

    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";

    const label = document.createElement('label');
    label.innerText = "123456";
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

    expect(createNewElement("123456",false)).toEqual(listItem)
});

test("Add Task Element to User DOM", () =>{
    listItem = createNewElement("task", false)

    expect(addTask(true,"task")).toEqual(listItem)
});

test("Finish Task Element", () =>{
    listItem = createNewElement("task", false)
    listItemTrue = createNewElement("task", true)
    const checkbox = listItem.querySelector('button.checkbox')
    checkbox.onclick = finishTask;
    
    expect(checkbox.click()).toEqual(listItemTrue)
});

test("Unfinish Task Element", () =>{
    listItem = createNewElement("task", true)
    listItemFalse = createNewElement("task", false)
    const checkbox = listItem.querySelector('button.checkbox')
    checkbox.onclick = unfinishTask;
    
    expect(checkbox.click()).toEqual(listItemFalse)
});

test("Edit Task Element", () =>{
    listItem1 = createNewElement("task", false)
    const editButton1 = listItem1.querySelector('button.edit');
    editButton1.onclick = editTask;

    listItem = createNewElement("task", false)
    const editButton = listItem.querySelector('button.edit');
    const label = listItem.querySelector('label');
    label.innerText = input.value;
    editButton.className = "material-icons edit";
    editButton.innerHTML = "<i class='material-icons'>edit</i>";
    
    expect(listItem1.click()).toEqual(listItem)
});