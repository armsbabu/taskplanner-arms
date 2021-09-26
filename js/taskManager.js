const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html = `<li class="card" style="min-width: 50vw">
  <div class="card-body">
    <p>#${id}</p>
    <h5 class="card-title">Task Name: ${name}</h5>
    <p class="card-text">Description: 
      ${description}
    </p>
    <p class="card-text">Assigned To: ${assignedTo}</p>
    <p class="card-text">Due Date: ${dueDate}</p>
    <div class="card-footer row">
      <div class="col-6">
        <p class="card-text"><b>Status: ${status}</b></p>
      </div>
      <div class="col-3">
        <button id ="${id}" class="btn btn-outline-success done-button">
          Done
        </button>
      </div>


      <div class="col-3">
        <button id ="${id}"  class="btn btn-outline-danger delete-button">
          Delete
        </button>
      </div>

    </div>
  </div>
</li>`;

  return html;
};

// Create the TaskManager class
class TaskManager {
  constructor(currentID = 0) {
    this.tasks = [];

    this.currentID = currentID;
  }

  //create the addTask method
  addTask(tname, description, assignedTo, dueDate, tstatus) {
    const task = {
      id: ++this.currentID,
      tname: tname,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      tstatus: tstatus,
    };
    this.tasks.push(task);
  }

  getTaskById(taskId) {
    // Create a variable to store the found task
    let foundTask;
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // console.log(task);
      // Check if its the right task by comparing the task's id to the id passed as a parameter

      // console.log(
      //   `taskid: ${typeof taskId},${taskId} , task.id ${typeof task.id}, ${
      //     task.id
      //   }`
      // );
      if (task.id == taskId) {
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }
    // console.log(foundTask);
    // Return the found task
    return foundTask;
  }

  //create the render method
  render() {
    let tasksHtmlList = [];
    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // console.log(task);
      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      // Create the task html
      const taskHtml = createTaskHtml(
        task.id,
        task.tname,
        task.description,
        task.assignedTo,
        formattedDate,
        task.tstatus
      );
      // Push it to the   array
      tasksHtmlList.push(taskHtml);
    }

    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }

  //save method for JSON stringfy to add to local storage
  save() {
    //create a JASOn string in localstorage
    const tasksJson = JSON.stringify(this.tasks);

    //store the JASON string in local storage
    localStorage.setItem("tasks", tasksJson);

    //convert the curent id to string
    const currentId = String(this.currentID);

    //store the currentId in localstorage
    localStorage.setItem("currentId", currentId);
  }
  // --------------
  //Load method to load JSON file from local storage
  load() {
    // check if any tasks are saved in localstorage
    if (localStorage.getItem("tasks")) {
      //get the JSON string of tasks in localstorage
      const tasksJson = localStorage.getItem("tasks");
      // convert as an array and store in our TaskManager
      this.tasks = JSON.parse(tasksJson);
    }

    // check currentId is saved in localStorage
    if (localStorage.getItem("currentId")) {
      //get the currentId string in localStorage
      const currentId = localStorage.getItem("currentId");

      //convert the currentid to a number and store it in out TaskManager
      // console.log(currentId);
      this.currentID = Number(currentId);
      // console.log(typeof this.currentID);
    }
  }
  //delete task function

  deleteTask(taskId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Check if the task id is not the task id passed in as a parameter
      if (task.id != taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
      }
    }

    // Set this.tasks to newTasks
    this.tasks = newTasks;
  }
}
