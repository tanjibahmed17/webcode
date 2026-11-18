let registrations = JSON.parse(localStorage.getItem("registrations"));
if (registrations == null) {
  registrations = [];
}

function showSummary() {
  let today = new Date();
  let upcoming = 0;
  let cancelled = 0;

  for (let i = 0; i < events.length; i++) {
    if (new Date(events[i].date) >= today) {
      upcoming++;
    }
  }

  for (let i = 0; i < registrations.length; i++) {
    if (registrations[i].status == "Cancelled") {
      cancelled++;
    }
  }

  document.getElementById("totalEvents").textContent = events.length;
  document.getElementById("totalRegistrations").textContent = registrations.length;
  document.getElementById("upcomingEvents").textContent = upcoming;
  document.getElementById("cancelledRegistrations").textContent = cancelled;
}

function showRegistrations() {
  let tableBody = document.getElementById("registrationsBody");
  tableBody.innerHTML = "";

  for (let i = 0; i < registrations.length; i++) {
    let booking = registrations[i];
    let row = document.createElement("tr");
    addCell(row, booking.bookingId);
    addCell(row, booking.name);
    addCell(row, booking.email);
    addCell(row, booking.event);
    addCell(row, booking.ticketType);
    addCell(row, booking.quantity);
    addCell(row, booking.status);
    tableBody.appendChild(row);
  }

  if (registrations.length == 0) {
    document.getElementById("noRegistrations").style.display = "block";
  } else {
    document.getElementById("noRegistrations").style.display = "none";
  }
}

function showEvents() {
  let tableBody = document.getElementById("eventsBody");
  tableBody.innerHTML = "";

  for (let i = 0; i < events.length; i++) {
    let ev = events[i];
    let row = document.createElement("tr");
    addCell(row, ev.name);
    addCell(row, ev.date);
    addCell(row, ev.location);

    let actionCell = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      if (confirm("Do you want to delete " + ev.name + "?")) {
        let index = -1;
        for (let k = 0; k < events.length; k++) {
          if (events[k].id == ev.id) {
            index = k;
          }
        }
        if (index != -1) {
          events.splice(index, 1);
          localStorage.setItem("events", JSON.stringify(events));
          showEvents();
          showSummary();
        }
      }
    });
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  }

  if (events.length == 0) {
    document.getElementById("noEvents").style.display = "block";
  } else {
    document.getElementById("noEvents").style.display = "none";
  }
}

function addCell(row, text) {
  let cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
}

showSummary();
showRegistrations();
showEvents();