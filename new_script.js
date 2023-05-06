// read from line 182 to get the overall flow of the code

i = 0;

// Retrieve stored data on loading the page
window.onload = () =>{
    // i = 0;
    chrome.storage.sync.get(['activeTasksList'], function(result){
        activeStuff = result.activeTasksList;
        console.log("Retrieved active tasks data => ", activeStuff);
        for(d = 0; d < activeStuff.length; d++){
            obj = {
                id: "cb"+i,
                checkbox: false,    
                name: activeStuff[d]["name"],
                delete: false,
                date: activeStuff[d]["date"]
            }
            createTaskElemets(activeStuff[d]["name"], activeStuff[d]["date"]);
            document.getElementById("activeTaskList").appendChild(divElem);
            tasks.push(obj);
            document.getElementById(tasks[tasks.length-1]["id"]).checked = false;

        }
    })

    chrome.storage.sync.get(['completedTasksList'], function(result2){
        completedStuff = result2.completedTasksList;
        console.log("Retrieved completed tasks data => ", completedStuff);

        for(g = 0; g < completedStuff.length; g++){
            obj = {
                id: "cb"+i,
                checkbox: true,    
                name: completedStuff[g]["name"],
                delete: false,
                date: completedStuff[g]["date"]
            }
            createTaskElemets(completedStuff[g]["name"], completedStuff[g]["date"]);
            document.getElementById("completedTaskList").appendChild(divElem);
            tasks.push(obj);
            document.getElementById(tasks[tasks.length-1]["id"]).checked = true;
            document.getElementById("divId"+tasks[tasks.length-1]["id"].slice(2, )).style.opacity ="0.6";
        }

    })


}


function createTaskElemets(taskInput, dateInput){
    // create div element which contails detals of a particular task
    divElem = document.createElement("div");
    divElem.id = 'divId'+i;
    
    // create checkbox to mark the task as completed
    checkBoxer = document.createElement("input");
    checkBoxer.type = "checkbox";
    checkBoxer.id = "cb"+i;
    checkBoxer.classList.add("Allcheckboxes");
    checkBoxer.style.width = "20px";
    // checkBoxer.style.marginLeft = "10px";
    
    // create <p> to add task name
    taskName = document.createElement("input");
    taskName.type = "text";
    taskName.value = taskInput;
    taskName.id = "tasknm" + i;
    taskName.setAttribute("readonly", "readonly");
    taskName.style.width = "16rem";
    taskName.style.backgroundColor = "#E7E9EB";
    taskName.style.border = "none";
    taskName.style.outline = "none";
    taskName.style.fontSize = "1rem";
    // taskName.marginleft = "1rem";
    
    // create a date element to add due date
    date = document.createElement("input");
    date.type = "datetime-local";
    date.value = dateInput;
    date.id = "date"+i;
    date.setAttribute("readonly", "readonly");
    date.style.marginRight  = "10px";
    date.style.borderRadius = "10px";
    date.style.border = "none";
    date.style.backgroundColor = "#E7E9EB";
    date.style.outline = "none";
    // date.style.fontSize = "1rem";

    // Edit button
    editButton = document.createElement("p");
    editButton.innerHTML = "Edit";
    editButton.id = "edb" + i;
    editButton.style.fontSize = "20px";
    editButton.style.marginRight = "10px";
    editButton.addEventListener("mouseover", function(){
        this.style.color = "red";
        this.style.cursor = "pointer";
    })
    editButton.addEventListener("mouseout", function(){
        this.style.opacity = "1";
        this.style.color = "black";
    })
    editButton.addEventListener("click", function(e){
        editId = e.target.id;
        console.log("edit id - ", editId);
        // when edit is clicked then, readonly attribute is removed from "task name input field" and "date"
        if(document.getElementById(editId).innerHTML.toLowerCase() == 'edit'){
            document.getElementById('tasknm' + editId.slice(3, )).removeAttribute("readonly");
            document.getElementById('date' + editId.slice(3, )).removeAttribute("readonly");
            document.getElementById('tasknm' + editId.slice(3, )).focus();
            document.getElementById(editId).innerHTML = "Save";

        }
        // If save is clicked then, readonly attribute is added again into the taskname and date;
        else{
            document.getElementById('tasknm' + editId.slice(3, )).setAttribute("readonly", "readonly");
            document.getElementById('date' + editId.slice(3, )).setAttribute("readonly", "readonly");
            document.getElementById(editId).innerHTML = "Edit";
            
            for(f = 0; f < tasks.length; f++){
                if(tasks[f]["id"] == "cb"+editId.slice(3, )){
                    tasks[f]["name"] = document.getElementById('tasknm' + editId.slice(3, )).value;
                    tasks[f]["date"] = document.getElementById('date' + editId.slice(3, )).value;
                    break;
                }
            }
            seperateActiveAndCompletedTasks();
        }
    })


    // Delete button
    deleteButton = document.createElement("img");
    deleteButton.src = "images/delete_img.png";
    deleteButton.style.width = "20px";
    deleteButton.backgroundColor = "#E7E9EB";
    deleteButton.id = "dlb" + i;
    deleteButton.style.cursor = "pointer";
    deleteButton.addEventListener("mouseover", function(){
        this.style.opacity = "0.8";
    })
    deleteButton.addEventListener("mouseout", function(){
        this.style.opacity = "1";
    })
    deleteButton.addEventListener("click", function(eee){
        deleteId = eee.target.id;
        document.getElementById('divId'+deleteId.slice(3, )).style.display = "none";
        console.log("Delete id - ", deleteId);
        for(u = 0; u < tasks.length; u++){
            if(tasks[u]["id"] == "cb" + deleteId.slice(3, )){
                tasks[u]["delete"] = true;
                break;
            }
        }
        seperateActiveAndCompletedTasks();
    })

    // appending checkbox, name and date to divElem
    divElem.appendChild(checkBoxer);
    divElem.appendChild(taskName);
    divElem.appendChild(date);
    divElem.appendChild(editButton);
    divElem.appendChild(deleteButton);
    
    // Styling divElem
    divElem.style.display = "flex";
    divElem.style.justifyContent = "space-between";
    date.style.width = "100px";
    divElem.style.margin = "4px";
    divElem.style.backgroundColor = "#E7E9EB";
    divElem.style.padding = "10px";
    divElem.style.borderRadius = "30px";
    divElem.style.margin = "20px";
    
    i++;
}

tasks = [];

// This function will excecute if add task is clicked
document.getElementById('addTask').addEventListener("click", function(){
    document.getElementById("error").innerHTML = "";
    
    // Getting the details of input data
    inputTask = document.getElementById("inputTask").value;
    inpDate = document.getElementById("inputDate").value;
    
    // Throwing an error if task is empty
    if(inputTask.length == 0){
        document.getElementById("error").innerHTML = "Enter a task";
    }
    
    // If a valid task is entered then a new object with all the elemnts to contain a task like checkbox, taskname, date is created.
    else{
        // create object containing these details of a task to display when reloaded using chrome api
        var obj = {
            id: "cb"+i,
            checkbox: false,    
            name: inputTask,
            delete: false,
            date: inpDate
        }

        // create new html elements and add values to them
        createTaskElemets(inputTask, inpDate);
        
        // crealing the values of input fields for new entry
        document.getElementById('inputTask').value = "";
        document.getElementById('inputDate').value = "";
        

        // appending divElem to active Task list
        document.getElementById('activeTaskList').appendChild(divElem);
        
        
        tasks.push(obj);
        console.log(tasks[i]);
        // i++;
        seperateActiveAndCompletedTasks();
    } 
    
})

// ************************
// This function is used when a checkbox is clicked: it will call addToDifferenttasks function
document.getElementById('taskDisplayArea').addEventListener("click", function(e){
    var checkboxIdName = e.target.id;
    if(checkboxIdName[0] == "c" && checkboxIdName[1] == "b"){
        addToDifferentTasks(checkboxIdName);
        seperateActiveAndCompletedTasks();
    }
})
// ************************



// This function is used to delete a task from active tasks list and add to complete task list when checkbox is clicked and vice-versa
function addToDifferentTasks(id){
    for(var k = 0; k < tasks.length; k++){
        if(tasks[k]['id'] == id){
            // console.log("checkbox with an id of", id," is present in tasks list at index - ", k);
            // add to completed and delete from active
            if(tasks[k]['checkbox'] == false){
                tasks[k]['checkbox'] = true;
                
                obj = {
                    id: "cb"+i,
                    checkbox: true,    
                    name: tasks[k]["name"],
                    delete: false,
                    date: tasks[k]["date"]
                }
               
                // Creates new div element to completed tasks
                createTaskElemets(tasks[k]["name"], tasks[k]["date"]);
                document.getElementById('completedTaskList').appendChild(divElem);
                
                // removes this task in active tasks after adding to completed tasks
                document.getElementById("divId"+tasks[k]['id'].slice(2, )).style.display = "none";
                
                tasks[k] = obj
                document.getElementById(tasks[k]["id"]).checked = true;
                document.getElementById("divId"+tasks[k]["id"].slice(2, )).style.opacity ="0.6"
                seperateActiveAndCompletedTasks();
            }
            // Add to active and delete from completed
            else{
                tasks[k]['checkbox'] = false;
                
                obj = {
                    id: "cb"+i,
                    checkbox: false,    
                    name: tasks[k]["name"],
                    delete: false,
                    date: tasks[k]["date"]
                }

                // creates new div elem to active tasks
                createTaskElemets(tasks[k]["name"], tasks[k]["date"]);
                document.getElementById("activeTaskList").appendChild(divElem);
                
                // removes this task from completed tasks after adding to active tasks
                document.getElementById("divId"+tasks[k]['id'].slice(2, )).style.display = "none";
                
                tasks[k] = obj;
                document.getElementById(tasks[k]["id"]).checked = false;
                // document.getElementById("divId"+tasks[k]["id"].slice(2, )).style.opacity ="1"
                seperateActiveAndCompletedTasks();
            }   
        }
    }
}

// Function to sepaerate active tasks and completed tasks from all tasks list
function seperateActiveAndCompletedTasks(){
    activeTasks = [];
    completedTasks = [];
    for(var z = 0; z < tasks.length; z++){
        if(tasks[z]['checkbox'] == false && tasks[z]["delete"] == false){
            activeTasks.push(tasks[z]);
        }
        else if(tasks[z]['checkbox'] == true && tasks[z]["delete"] == false){
            completedTasks.push(tasks[z]);
        }
    }

    storeData();

    console.log("active - ", activeTasks);
    console.log("completed ", completedTasks);
}

// Used to store the data in chrome storage to retrieve the saved data when the page is reloaded.
function storeData(){
    chrome.storage.sync.set({activeTasksList: activeTasks}, function(){
        console.log("Active tasks data is stored");
    })

    chrome.storage.sync.set({completedTasksList: completedTasks}, function(){
        console.log("Completed tasks data is stored");
    })
}




















