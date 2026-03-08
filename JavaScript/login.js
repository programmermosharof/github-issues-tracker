
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username === "admin" && password === "admin123"){
        alert("Login successful");
        window.location.href = "../index.html";
    }else{
        alert("Username or Password wrong");
    }

});
