document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("subscription-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) {
            alert("¡Formulario enviado con éxito!");
            form.reset(); // Para limpiar el formulario después del envío
        } else {
            alert("Por favor, corrige los errores en el formulario.");
        }
    });

    const inputs = form.querySelectorAll("input");

    inputs.forEach(input => {
        input.addEventListener("blur", function() {
            validateInput(input);
        });

        input.addEventListener("focus", function() {
            clearErrorMessage(input);
        });
    });

    function validateForm() {
        let isValid = true;

        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateInput(input) {
        const value = input.value.trim();
        const errorElement = document.getElementById(input.id + "-error");

        switch (input.id) {
            case "nombre":
                if (value.length <= 6 || !/\s/.test(value)) {
                    setError(input, errorElement, "Debe tener más de 6 letras y al menos un espacio entre medio.");
                    return false;
                }
                break;
            case "email":
                if (!isValidEmail(value)) {
                    setError(input, errorElement, "Debe tener un formato de email válido.");
                    return false;
                }
                break;
            case "contrasena":
                if (!isValidPassword(value)) {
                    setError(input, errorElement, "Al menos 8 caracteres, formados por letras y números.");
                    return false;
                }
                break;
            case "repetir-contrasena":
                const passwordValue = document.getElementById("contrasena").value.trim();
                if (value !== passwordValue) {
                    setError(input, errorElement, "Las contraseñas no coinciden.");
                    return false;
                }
                break;
            case "edad":
                if (!isValidAge(value)) {
                    setError(input, errorElement, "Número entero mayor o igual a 18.");
                    return false;
                }
                break;
            case "telefono":
                if (!isValidPhone(value)) {
                    setError(input, errorElement, "Número de al menos 7 dígitos, no aceptar espacios, guiones ni paréntesis.");
                    return false;
                }
                break;
            case "direccion":
                if (value.length < 5 || !/\s/.test(value)) {
                    setError(input, errorElement, "Al menos 5 caracteres, con letras, números y un espacio en el medio.");
                    return false;
                }
                break;
            case "ciudad":
                if (value.length < 3) {
                    setError(input, errorElement, "Al menos 3 caracteres.");
                    return false;
                }
                break;
            case "codigo-postal":
                if (value.length < 3) {
                    setError(input, errorElement, "Al menos 3 caracteres.");
                    return false;
                }
                break;
            case "dni":
                if (!isValidDNI(value)) {
                    setError(input, errorElement, "Número de 7 u 8 dígitos.");
                    return false;
                }
                break;
            default:
                clearErrorMessage(input);
                return true;
        }

        clearErrorMessage(input);
        return true;
    }

    function setError(input, errorElement, message) {
        input.classList.add("error");
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    function clearErrorMessage(input) {
        input.classList.remove("error");
        const errorElement = document.getElementById(input.id + "-error");
        errorElement.textContent = "";
        errorElement.style.display = "none";
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    function isValidAge(age) {
        const ageNumber = parseInt(age, 10);
        return !isNaN(ageNumber) && ageNumber >= 18;
    }

    function isValidPhone(phone) {
        const phoneRegex = /^\d{7,}$/;
        return phoneRegex.test(phone);
    }

    function isValidDNI(dni) {
        const dniRegex = /^\d{7,8}$/;
        return dniRegex.test(dni);
    }

    function submitForm() {
        // Aquí podrías realizar el envío del formulario
        // usando AJAX o cualquier otra técnica
        alert("¡Formulario enviado con éxito!");
    }
});

inputs.forEach(input => {
    input.addEventListener("blur", function() {
        validateInput(input);
    });
});

inputs.forEach(input => {
    input.addEventListener("focus", function() {
        clearErrorMessage(input);
    });
});

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function() {
    if (validateForm()) {
        alert("¡Formulario enviado con éxito!");
        form.reset();
    } else {
        alert("Por favor, corrige los errores en el formulario.");
    }
});

const formTitle = document.getElementById("form-title");
const formTitleInput = document.getElementById("form-title-input");

formTitleInput.addEventListener("input", function() {
    formTitle.textContent = formTitleInput.value;
});
