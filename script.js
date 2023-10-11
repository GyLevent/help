document.getElementById("login").onsubmit = function (event) {
  event.preventDefault();
  var email = event.target.elements.email.value;
  var password = event.target.elements.password.value;
  var body = JSON.stringify({
    email: email,
    password: password,
  });

  console.log(email, password);
  fetch("https://reqres.in/api/login", {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (!response.ok) {
        return Promise.reject("login hiba!");
      }
      console.log(response.json);
    })
    .then(function (response) {
      return fetch("https://reqres.in/api/users");
    })
    .then(function (response) {
      if (!response.ok) {
        return Promise.rejected("Users hiba!");
      }
      console.log(response.json);
    })
    .then(function (userPage) {
      state = userPage.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

function userRender() {
  var usersHTML = "";
  for (var user of state) {
    usersHTML +=
      '<li class="list-group-item">${user.first_name} ${user.last_name}</li>';
  }
  document.getElementById("user-list-container").innerHTML =
    '<ul "class=list-group">' + usersHTML + "</ul>";
}
