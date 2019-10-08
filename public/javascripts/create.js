
function createAccount(){
  let user = document.querySelector( '#newUsername' )
  let password = document.querySelector( '#newPassword' )
  let json = { user: user.value, pass: password.value}
  let body = JSON.stringify(json)
  
  fetch( '/api/users/create', {
      headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: body
  }).then(function(res){
    res.text().then(function(str) {
      if (str == "OK") {
        alert("Account created!")
        window.location = "/index";
      }
      if (str == "BAD") {
        alert("User exists!");
      }
    });
  });
}

window.onload = function() {
  const button = document.getElementById('createAccount')
  button.onclick = createAccount
}
