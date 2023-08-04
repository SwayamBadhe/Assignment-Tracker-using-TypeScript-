let rowIndex = 0;

interface FormData {
  subject: string;
  assignmentName: string;
  givenDate: string;
  dueDate: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const formDataArrayStr: string | null = localStorage.getItem("formDataArray");
  if (formDataArrayStr) {
    const formDataArray: FormData[] = JSON.parse(formDataArrayStr);

    // Creating table elements
    const tableBody: HTMLElement | null = document.getElementById("table-body");
    if (!tableBody) return;

    const deleteRow = (index: number) => {
      formDataArray.splice(index, 1);
      updateLocalStorageAndTable();
    };

    const updateLocalStorageAndTable = () => {
      localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
      displayFormData(formDataArray);
    };

    const sortBySubject = () => {
      formDataArray.sort((a, b) => {
        return a.subject.localeCompare(b.subject);
      });
      updateLocalStorageAndTable();
    };

    const displayFormData = (data: FormData[]) => {
      tableBody.innerHTML = "";
      rowIndex = 0;
      for (let i = 0; i < data.length; i++) {
        const formData: FormData = data[i];
        const newRow: HTMLTableRowElement = document.createElement("tr");

        const cellIndex: HTMLTableCellElement = document.createElement("td");
        cellIndex.textContent = String(++rowIndex);

        const cellAsignName: HTMLTableCellElement = document.createElement("td");
        cellAsignName.textContent = formData.assignmentName;

        const cellSubject: HTMLTableCellElement = document.createElement("td");
        if (formData.subject === "1") {
          formData.subject = "DBMS";
        } else if (formData.subject === "2") {
          formData.subject = "TOC";
        } else if (formData.subject === "3") {
          formData.subject = "Computer Network";
        }

        cellSubject.textContent = formData.subject;

        const cellGivenDate: HTMLTableCellElement = document.createElement("td");
        cellGivenDate.textContent = formData.givenDate;

        const cellDueDate: HTMLTableCellElement = document.createElement("td");
        cellDueDate.textContent = formData.dueDate;

        const deleteIconCell: HTMLTableCellElement = document.createElement("td");
        const deleteIcon: HTMLElement = document.createElement("i");
        deleteIcon.classList.add("uil", "uil-trash-alt");
        deleteIconCell.appendChild(deleteIcon);

        deleteIcon.addEventListener("click", () => {
          deleteRow(i);
          newRow.remove();
        });

        newRow.appendChild(cellIndex);
        newRow.appendChild(cellSubject);
        newRow.appendChild(cellAsignName);
        newRow.appendChild(cellGivenDate);
        newRow.appendChild(cellDueDate);
        newRow.appendChild(deleteIconCell);

        tableBody.appendChild(newRow);
      }
    };

    displayFormData(formDataArray);

    const sortButton: HTMLElement | null = document.getElementById("sort-button");
    if (sortButton) {
      sortButton.addEventListener("click", sortBySubject);
    }
  }
});
