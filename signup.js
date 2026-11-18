let form = document.getElementById("signupForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let fullName = document.getElementById("fullName");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirmPassword");

  fullName.style.border = "";
  email.style.border = "";
  phone.style.border = "";
  password.style.border = "";
  confirmPassword.style.border = "";

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

  if (password.value == "") {
    showError(password, "Password must be filled out");
    return;
  }

  if (password.value.length < 6) {
    showError(password, "Password must be at least 6 characters");
    return;
  }

  if (confirmPassword.value == "") {
    showError(confirmPassword, "Please confirm your password");
    return;
  }

  if (password.value != confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users"));
  if (users == null) {
    users = [];
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email.value.trim()) {
      showError(email, "This email is already registered");
      return;
    }
  }

  let user = {
    name: fullName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    password: password.value
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign up successful! Please login.");
  window.location.href = "login.html";
});

function showError(input, message) {
  alert(message);
  input.style.border = "2px solid red";
  input.focus();
}