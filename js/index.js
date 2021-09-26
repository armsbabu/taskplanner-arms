// Initialise new TaskManager with currentID=0
const taskManager = new TaskManager(0);
// all code here

//loading the tasks stored from the localStorage
taskManager.load();

//render the loaded tasks to the page
taskManager.render();

// select new task form
const form = document.querySelector("#new-task-form");

form.addEventListener("click", (event) => {
  let validateName = document.querySelector("#tasknameV");
  //   select the input

  let validateDescription = document.querySelector("#descriptionV");
  let validateassignedtoV = document.querySelector("#assignedtoV");
  let validateduedate = document.querySelector("#duedate");
  let validatestatusV = document.querySelector("#statusV");
  let validateFail = 0;

  // Prevent default action
  event.preventDefault();

  // clearform function

  const clearFormFields = () => {
    validateName.value = "";
    validateDescription.value = "";
    validateassignedtoV.value = "";
    validateduedate.value = "";
    validatestatusV.value = "In-Progress";
    // ------------------
    validateName.classList.remove("is-valid");
    validateDescription.classList.remove("is-valid");
    validateassignedtoV.classList.remove("is-valid");
    validateduedate.classList.remove("is-valid");
    validatestatusV.classList.remove("is-valid");
  };

  // console.log(`TaskName: ${validateName.value}`);
  // console.log(`Description: ${validateDescription.value}`);
  // console.log(`Assinged-To: ${validateassignedtoV.value}`);
  // console.log(`Due Date: ${validateduedate.value}`);
  // console.log(`Status: ${validatestatusV.value}`);

  if (validateName.value.length > 4) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validateFail++;
  }

  if (validateDescription.value.length > 4) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validateFail++;
  }

  if (validateassignedtoV.value.length > 4) {
    validateassignedtoV.classList.add("is-valid");
    validateassignedtoV.classList.remove("is-invalid");
  } else {
    validateassignedtoV.classList.add("is-invalid");
    validateassignedtoV.classList.remove("is-valid");
    validateFail++;
  }

  if (validateduedate.value.length > 4) {
    validateduedate.classList.add("is-valid");
    validateduedate.classList.remove("is-invalid");
  } else {
    validateduedate.classList.add("is-invalid");
    validateduedate.classList.remove("is-valid");
    validateFail++;
  }

  if (validatestatusV.value.length > 4) {
    validatestatusV.classList.add("is-valid");
    validatestatusV.classList.remove("is-invalid");
  } else {
    validatestatusV.classList.add("is-invalid");
    validatestatusV.classList.remove("is-valid");
    validateFail++;
  }
  // ------------------------------
  if (validateFail > 0) {
    validateFail = 0;
    return;
  } else {
    taskManager.addTask(
      validateName.value,
      validateDescription.value,
      validateassignedtoV.value,
      validateduedate.value,
      validatestatusV.value
    );
    clearFormFields();
    taskManager.render();
  }
});

const tasklist = document.querySelector("#task-list");
// on click event listener to the task list
tasklist.addEventListener("click", (event) => {
  //checking "Mark as done" button clicked
  // console.log(event.target.classList.contains("done-button"));
  if (event.target.classList.contains("done-button")) {
    //console.log(event.target.parentElement) to see
    // console.log(event.target.parentElement);
    const parentTask =
      event.target.parentElement.parentElement.parentElement.parentElement;

    // console.log(parentTask);

    //get the taskId of the parent Task and turn it into a number
    const taskId = Number(parentTask.dataset.taskId);
    // console.log(`taskID: ${taskId}`);
    // get the task from the taskmanager using the taskId
    const task = taskManager.getTaskById(event.target.id);
    // console.log(`task: ${task}`);
    // console.log(task.status);
    // console.log(event.target.id);
    // console.log(taskManager.getTaskById(event.target.id));
    //update the task status to 'DONE'
    task.status = "Done";

    // calling taskmanager.save function in taskmanager.js
    taskManager.save();

    //Render the tasks
    taskManager.render();
  }
});
