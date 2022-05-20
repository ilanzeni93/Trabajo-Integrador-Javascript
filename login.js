const form = document.getElementById("form")
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const boton =  document.getElementById("boton")
//ventana
const ventana = document.getElementById("ventana")
const usuarioSpan = document.getElementById("usuarioSpan")
const botonVentana = document.getElementById("botonVentana")


form.addEventListener("submit", (e) => {
    e.preventDefault();
    validate();
});

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const validate = () => {
    const user = username.value.trim();
    const mail = email.value.trim();
    const pass = password.value.trim();

    //Validacion Nombre Usuario
    if (user === "") {
        let errorMessage = "El user no puede estar vacío";
        inputError(username, errorMessage);
    } else if (user.length < 2 || user.length > 30) {
        let errorMessage =
          "El nombre de usuario debe tener entre 2 y 30 caracteres";
        inputError(username, errorMessage);
    } else {
        inputSuccess(username);
    }

    //Validacion email
    if (mail === "") {
        let errorMessage = "El email no puede estar vacío";
        inputError(email, errorMessage);
    } else if (!emailRegex.test(mail)) {
        let errorMessage = "El email no es válido";
        inputError(email, errorMessage);
    } else {
        inputSuccess(email);
    }

    //Validacion Contraseña
    if (pass === "") {
        let errorMessage = "El password no puede estar vacío";
        inputError(password, errorMessage);
    } else if (!passRegex.test(pass)) {
        let errorMessage =
          "El password no es válido. Debe tener mayúscula, minúscula, números y al menos 8 caracteres.";
        inputError(password, errorMessage);
    } else {
        inputSuccess(password);
    }
}

const inputSuccess = (input) => {
    const inputParent = input.parentElement;

    const small = inputParent.querySelector("small");
    inputParent.classList.add("success");
    inputParent.classList.remove("error");
    small.innerHTML = "";
    usuarioSpan.innerHTML = `${username.value}`
    ventana.classList.remove("hidden")

    botonVentana.addEventListener("click", () => {
        ventana.classList.add("hidden")
        form.reset()
    })
};

const inputError = (input, message) => {
    const inputParent = input.parentElement;
  
    const small = inputParent.querySelector("small");
    inputParent.classList.add("error");
    inputParent.classList.remove("success");
  
    small.classList.add("error");
    small.innerHTML = message;

    console.log(small)
};





