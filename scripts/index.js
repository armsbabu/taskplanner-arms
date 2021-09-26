const form = document.querySelector("#new-task-form");

form.addEventListener("submit", () => {
  let validateName = documnet.querySelector("#tasknameV");
  //   console.log(`name ${validateName.value}`);

  let validateDescription = documnet.querySelector("#descriptionV");
  let validateassignedtoV = documnet.querySelector("#assignedtoV");
  let validateduedate = documnet.querySelector("#duedate");
  let validatestatusV = documnet.querySelector("#statusV");
  let validateFail = 0;
  console.log(`TaskName: ${validateName.value}`);

  if (validateName.value.length > 5) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validateFail++;
  }
  if (validateFail > 0) {
    validateFail = 0;
    return;
  }
});
