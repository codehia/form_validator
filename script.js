const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Get Field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check if the fields are required
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value === "") {
      showError(input, `${getFieldName(input)} is required`);
    }
  });
}

function checkLength(input, minimum, max) {
  if (input.value.length < minimum) {
    showError(
      input,
      `${getFieldName(input)} must be greater than ${minimum} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be greater than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
// Check id email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // regular expression to validate email-id

  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check if both the passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input1);
    showSuccess(input2);
  } else {
    showError(input2, "Passwords Do not match");
  }
}

// Event Listeners
form.addEventListener("submit", function(e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 5, 20);
  checkLength(password, 8, 50);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
