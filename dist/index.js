"use strict";
// Current Date
document.addEventListener("DOMContentLoaded", () => {
    let defaultDateInput = document.getElementById("default-date");
    const currDate = new Date().toISOString().split("T")[0];
    if (defaultDateInput) {
        defaultDateInput.value = currDate;
    }
    // In case date change is made
    if (defaultDateInput) {
        defaultDateInput.addEventListener("change", (e) => {
            const selectedDate = e.target.value;
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
const handleFormSubmit = (event) => {
    event.preventDefault();
    let form = document.querySelector("form");
    const subject = form.querySelector(".form-select").value;
    const assignmentName = form.querySelector('.form-control').value;
    const givenDate = form.querySelector('.form-control#default-date').value;
    const dueDate = form.querySelector('.form-control[type="date"]').value;
    form.reset();
    const formDataArrayStr = localStorage.getItem("formDataArray");
    const formDataArray = formDataArrayStr ? JSON.parse(formDataArrayStr) : [];
    formDataArray.push({
        subject: subject,
        assignmentName: assignmentName,
        givenDate: givenDate,
        dueDate: dueDate,
    });
    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
};
