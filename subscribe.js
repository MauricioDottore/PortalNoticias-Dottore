document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("subscription-form");
    const inputs = form.querySelectorAll("input");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) {
            sendData();
        } else {
            alert("Por favor, corrige los errores en el formulario.");
        }
    });

    function sendData() {
        const formData = new FormData(form);
        let queryParams = "";
        formData.forEach((value, key) => {
            queryParams += `&${key}=${value}`;
        });
        // Eliminamos el primer "&" que queda al concatenar los parámetros
        queryParams = queryParams.substring(1);
        const url = `https://jsonplaceholder.typicode.com/users?${queryParams}`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                showModal("¡Suscripción exitosa!", data);
                saveToLocalStorage(data);
            })
            .catch(error => {
                showModal("Error en la suscripción", { error: error.message });
            });
    }
    

    function showModal(message, data) {
        modalContent.innerHTML = `<h2>${message}</h2><pre>${JSON.stringify(data, null, 2)}</pre>`;
        modal.style.display = "block";
    }

    modal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    function saveToLocalStorage(data) {
        localStorage.setItem("subscriptionData", JSON.stringify(data));
    }

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

    window.onload = function() {
        const savedData = localStorage.getItem("subscriptionData");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            // Llenar el formulario con los datos guardados
            Object.keys(parsedData).forEach(key => {
                const input = document.getElementById(key);
                if (input) {
                    input.value = parsedData[key];
                }
            });
        }
    };
});

/*Ocultar Modal*/
modal.addEventListener("click", function() {
    modal.style.display = "none";
});
