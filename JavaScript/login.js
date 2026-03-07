// // console.log("hi my name is js");



// document.getElementById('SignIn-btn').addEventListener('click', ()=>{
//      // 1: ============== Get The userName  ==============
//     //   const loginForm = document.getElementById('login-form');
//     const username = document.getElementById('username');
//       const userName = username.value;

//     //   const username = document.getElementById('username');
//     // 2: ============== Get The Password  ==============
//       const password = document.getElementById('password');

//       const checkPassword = password.value;

//     //3: ============== check Username and Password ==============
//     if(userName === "admin" && checkPassword === "admin123"){
//           alert('Your Login Successfully complete ');

//         window.location.assign("index.html"); 
//     }else{
//          alert('Yor Login Details is Wrong')
//         return;
//     }
// })
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
