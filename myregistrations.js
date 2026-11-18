let registrations = JSON.parse(localStorage.getItem("registrations"));
if (registrations == null) {
  registrations = [];
}

let loggedInEmail = localStorage.getItem("loggedInEmail");
let tableBody = document.getElementById("registrationsBody");
let emptyMessage = document.getElementById("emptyMessage");

function showRegistrations() {
  tableBody.innerHTML = "";
  let count = 0;

  for (let i = 0; i < registrations.length; i++) {
    let booking = registrations[i];

    if (loggedInEmail != null && booking.email != loggedInEmail) {
      continue;
    }

    let row = document.createElement("tr");
    addCell(row, booking.bookingId);
    addCell(row, booking.event);
    addCell(row, booking.date);
    addCell(row, booking.ticketType);
    addCell(row, booking.quantity);

    let statusCell = document.createElement("td");
    statusCell.textContent = booking.status + " ";

    if (booking.status == "Confirmed") {
      let cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", function () {
        if (confirm("Do you want to cancel booking " + booking.bookingId + "?")) {
          registrations[i].status = "Cancelled";
          localStorage.setItem("registrations", JSON.stringify(registrations));
          showRegistrations();
        }
      });
      statusCell.appendChild(cancelButton);
    }

    row.appendChild(statusCell);
    tableBody.appendChild(row);
    count++;
  }

  if (count == 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}

function addCell(row, text) {
  let cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
}

showRegistrations();