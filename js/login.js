const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");


loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = loginForm.username.value;
    const password = loginForm.password.value;

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      window.location.replace("/todo.html");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      loginErrorMsg.style.opacity = 1;
    });
})

module.exports = {loadJsonItems};