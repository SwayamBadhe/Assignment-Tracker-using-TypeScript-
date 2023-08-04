// Current Date
document.addEventListener("DOMContentLoaded", () => {
  let defaultDateInput: HTMLInputElement | null = document.getElementById(
    "default-date"
  ) as HTMLInputElement;
  const currDate = new Date().toISOString().split("T")[0];

  if (defaultDateInput) {
    defaultDateInput.value = currDate;
  }

  // In case date change is made

  if (defaultDateInput) {
    defaultDateInput.addEventListener("change", (e) => {
      const selectedDate = (e.target as HTMLInputElement).value;

      if (!selectedDate && defaultDateInput) {
        defaultDateInput.value = currDate;
      }
    });
  }
});

// Form event Listener - Sumbit entry
document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});

const handleFormSubmit = (event: Event) => {
  event.preventDefault();
  let form = document.querySelector("form") as HTMLFormElement;

  const subject = (form.querySelector(".form-select") as HTMLSelectElement).value;
  const assignmentName = (form.querySelector('.form-control') as HTMLInputElement).value;
  const givenDate = (form.querySelector('.form-control#default-date') as HTMLInputElement).value;
  const dueDate = (form.querySelector('.form-control[type="date"]') as HTMLInputElement).value;

  form.reset();

  const formDataArrayStr = localStorage.getItem("formDataArray");
  const formDataArray: any[] = formDataArrayStr ? JSON.parse(formDataArrayStr) : [];

  formDataArray.push({
    subject: subject,
    assignmentName: assignmentName,
    givenDate: givenDate,
    dueDate: dueDate,
  });

  localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
};
