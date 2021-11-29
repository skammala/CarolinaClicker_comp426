// Access the form elements
const loginForm = document.querySelector("#login");
const createForm = document.querySelector("#createUser");
const deleteForm = document.querySelector("#deleteUser");

loginForm.addEventListener( "submit", e => {
    e.preventDefault();
    loginUser(loginForm);
});

createForm.addEventListener( "submit", e => {
    e.preventDefault();
    newUser(createForm);
});

deleteForm.addEventListener( "submit", e => {
    e.preventDefault();
    deleteUser(deleteForm);
});

const loginUser = form => {
  const XHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new URLSearchParams(new FormData(form));

  // Define what happens on successful data submission
  XHR.addEventListener("load", e => {
    if (Object.keys(JSON.parse(e.target.responseText)).length > 1) {
      alert("LOGIN SUCCESSFUL FOR USER " + FD.get("user"))
    } else {
      alert("Login unsuccessful")
    }
  });

  // Define what happens in case of error
  XHR.addEventListener("error", e => console.log("Something went wrong."));

  // Set up our request
  XHR.open("GET", "http://localhost:5000/app/login/" + FD.get("user") + "/" + FD.get("pass"));
  console.log("http://localhost:5000/app/login/" + FD.get("user") + "/" + FD.get("pass"))

  // The data sent is what the user provided in the form
  XHR.send();

  form.reset();
}

const newUser = form => {
  const XHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new URLSearchParams(new FormData(form));

  // Define what happens on successful data submission
  XHR.addEventListener("load", e => console.log(e.target.responseText));

  // Define what happens in case of error
  XHR.addEventListener("error", e => console.log("Something went wrong."));

  // Set up our request
  XHR.open("POST", "http://localhost:5000/app/new");

  // The data sent is what the user provided in the form
  XHR.send(FD);

  form.reset();
}

const deleteUser = form => {
  const XHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new URLSearchParams(new FormData(form));

  // Define what happens on successful data submission
  XHR.addEventListener("load", e => console.log(e.target.responseText));

  // Define what happens in case of error
  XHR.addEventListener("error", e => console.log("Something went wrong."));

  // Confirm user wishes to delete account with that username
  if (confirm("Press ok to delete the account with username " + FD.get("user"))) {
    // Set up our request
    XHR.open("DELETE", "http://localhost:5000/app/delete/user/" + FD.get("user"));

    // The data sent is what the user provided in the form
    XHR.send();
  }

  form.reset();
}
