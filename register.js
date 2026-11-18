let eventSelect = document.getElementById("event");

// Pre-select event from ?event= in URL, then fill dropdown from events array
let params = new URLSearchParams(window.location.search);
let preSelected = params.get("event");

for (let i = 0; i < events.length; i++) {
  let option = document.createElement("option");
  option.value = events[i].id;
  option.textContent = events[i].name + " (" + events[i].date + ")";
  if (preSelected != null && preSelected == events[i].id) {
    option.selected = true;
  }
  eventSelect.appendChild(option);
}

let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let fullName = document.getElementById("fullName");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let eventName = document.getElementById("event");
  let ticketType = document.getElementById("ticketType");
  let quantity = document.getElementById("quantity");
  let notes = document.getElementById("notes");
  let terms = document.getElementById("terms");

  fullName.style.border = "";
  email.style.border = "";
  phone.style.border = "";
  eventName.style.border = "";
  ticketType.style.border = "";
  quantity.style.border = "";
  notes.style.border = "";

  if (fullName.value.trim() == "") {
    showError(fullName, "Full name must be filled out");
    return;
  }

  if (!/^[A-Za-z ]+$/.test(fullName.value.trim())) {
    showError(fullName, "Name can only have letters and spaces");
    return;
  }

  if (email.value.trim() == "") {
    showError(email, "Email must be filled out");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError(email, "Please enter a valid email address");
    return;
  }

  if (phone.value.trim() == "") {
    showError(phone, "Phone number must be filled out");
    return;
  }

  if (!/^[0-9]{11}$/.test(phone.value.trim())) {
    showError(phone, "Phone number must be 11 digits");
    return;
  }

  if (eventName.value == "") {
    showError(eventName, "Please choose an event");
    return;
  }

  if (ticketType.value == "") {
    showError(ticketType, "Please select a ticket type");
    return;
  }

  if (quantity.value == "") {
    showError(quantity, "Please enter number of tickets");
    return;
  }

  if (quantity.value < 1 || quantity.value > 10) {
    showError(quantity, "You can book 1 to 10 tickets only");
    return;
  }

  if (notes.value.length > 200) {
    showError(notes, "Special requests must be under 200 characters");
    return;
  }

  if (!terms.checked) {
    alert("You must agree to the terms and conditions");
    terms.focus();
    return;
  }

  let selectedEvent = null;
  for (let i = 0; i < events.length; i++) {
    if (events[i].id == eventName.value) {
      selectedEvent = events[i];
    }
  }

  if (selectedEvent == null) {
    showError(eventName, "This event is no longer available");
    return;
  }

  let registrations = JSON.parse(localStorage.getItem("registrations"));
  if (registrations == null) {
    registrations = [];
  }

  let booking = {
    bookingId: "EH" + Date.now(),
    name: fullName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    event: selectedEvent.name,
    date: selectedEvent.date,
    ticketType: ticketType.value,
    quantity: Number(quantity.value),
    notes: notes.value.trim(),
    status: "Confirmed"
  };

  registrations.push(booking);
  localStorage.setItem("registrations", JSON.stringify(registrations));

  // Save as logged-in user so My Registrations shows it
  localStorage.setItem("loggedInEmail", email.value.trim());

  alert("Registration successful! Your booking ID is " + booking.bookingId);
  window.location.href = "my registration.html";
});

function showError(input, message) {
  alert(message);
  input.style.border = "2px solid red";
  input.focus();
}