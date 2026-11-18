let form = document.getElementById("loginForm");

let wrongAttempts = 0;
let isLocked = false;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let role = document.getElementById("role");

  email.style.border = "";
  password.style.border = "";

  if (isLocked) {
    alert("Too many wrong attempts. Try again after 1 minute.");
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

  if (password.value == "") {
    showError(password, "Password must be filled out");
    return;
  }

  if (password.value.length < 6) {
    showError(password, "Password must be at least 6 characters");
    return;
  }

  let found = false;

  if (role.value == "admin") {
    if (email.value.trim() == "admin@eventhub.com" && password.value == "admin123") {
      found = true;
    }
  } else {
    let users = JSON.parse(localStorage.getItem("users"));
    if (users == null) {
      users = [];
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].email == email.value.trim() && users[i].password == password.value) {
        found = true;
      }
    }
  }

  if (!found) {
    wrongAttempts++;
    showError(password, "Wrong email or password! Attempt " + wrongAttempts + " of 3");

    if (wrongAttempts >= 3) {
      isLocked = true;
      password.disabled = true;
      alert("Too many wrong attempts. Login is locked for 1 minute.");

      setTimeout(function () {
        isLocked = false;
        wrongAttempts = 0;
        password.disabled = false;
        alert("Login unlocked. Try again.");
      }, 60000);
    }
    return;
  }

  wrongAttempts = 0;
  alert("Login successful!");

  if (role.value == "admin") {
    localStorage.setItem("role", "admin");
    window.location.href = "admin.html";
  } else {
    localStorage.setItem("loggedInEmail", email.value.trim());
    localStorage.setItem("role", "user");
    window.location.href = "index.html";
  }
});

function showError(input, message) {
  alert(message);
  input.style.border = "2px solid red";
  input.focus();
}