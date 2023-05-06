# LineUp
-> LineUp is an extension to track your daily tasks, helping you focus on work and study.

-> It increases your productivity by organizing things neatly and helps getting your day to day tasks done efficiently. 

-> Unlike the apps which are highly complicated to use, this one makes your life simple with super clear user interface.

This is how it works:
<b>Manifest file:</b> A manifest file is there to provide basic info to the chrome such as manivest version, service_workers, URL matches.

<b>Popup.html:</b> This is a htnl file used to provide the ui of the extension;
<b>style.css:</b> This is a style sheet to make the extension look much prettier.

<b>new_script.js:</b> Now lets get to the javascript file where all the logic and functionality of this extension lies:
(if you are reading the javascript file, read it from line 182 to get the better flow).

A brief overview of js file: 
So there are 4 types of importatant functions used in this:
(i) createTaskElemets() - used to create UI like checkbox, taskinput field(task container), date, etc.
(ii) addToDifferentTasks() - used when the checkbox is clixked, when it is clicked on activeTasks then this function deletes that task from active tasks and create the same task in completed tasks and vice-versa.
(iii) seperateActiveAndCompletedTasks() - Used to seperate active tasks and completed tasks when a totaltasks list is passed;
(iv) storeData(): USed to store the data in chrome storage API which can then be retrived when the extension is reloaded.

1) So first when the add task button is clicked on the extension, then it will call a function to get the inputs(taskname and date)
2) then with the information provided, this function will create a object with all input information and then it calls another function(createTaskElemets) where the Ui and content for the new task will be created, and this task is then pushed to an array called task[];
3) Now, In the task there are 2 update features(edit task name and date, delete task)
4) Edit task will remove readonly attribute from taskname field and date, and when save is clicked the new info is them updated.
5) delete just removes the complete task div from the extension.
6) When the checkbox is clicked addToDifferentTasks() kicks in.
7) And there are 2 lists called activeTasklist and completedTasklist, these 2 are stored in chrome storage using its API.
8) And when the extension is loaded: then basically it retrieves the stored data through the chrome storage APi.
