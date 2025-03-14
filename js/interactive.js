document.addEventListener("DOMContentLoaded", function () {
    let currentSection = 1;

    // SECCIÓN 1: Nombre, Email y Teléfono
    function validateName() {
        const name = document.getElementById("name");
        const nameError = document.getElementById("nameError");
        if (!name.value.trim()) {
            nameError.style.display = "inline";
            name.style.border = "2px solid red";
            return false;
        }
        nameError.style.display = "none";
        name.style.border = "";
        return true;
    }

    function validateEmail() {
        const email = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email.value)) {
            emailError.style.display = "inline";
            email.style.border = "2px solid red";
            return false;
        }
        emailError.style.display = "none";
        email.style.border = "";
        return true;
    }

    function validatePhone() {
        const telefono = document.getElementById("telefono");
        const telefonoError = document.getElementById("telefonoError");
        const regex = /^[0-9]{9}$/;
        if (!regex.test(telefono.value)) {
            telefonoError.style.display = "inline";
            telefono.style.border = "2px solid red";
            return false;
        }
        telefonoError.style.display = "none";
        telefono.style.border = "";
        return true;
    }

    function countPhoneNumbers() {
        const telefono = document.getElementById("telefono");
        const numberCount = document.getElementById("numberCount");
        numberCount.textContent = `Has escrito ${telefono.value.length} números.`;
        if (telefono.value.length > 9) {
            telefono.value = telefono.value.substring(0, 9);
        }
    }

    // SECCIÓN 2: Experiencia de Compra
    function saveData() {
        const inputs = document.querySelectorAll(`#section-${currentSection} input, #section-${currentSection} select, #section-${currentSection} textarea`);
        inputs.forEach(input => {
            localStorage.setItem(input.name, input.value);
        });
    }

    function validateCurrentSection(section) {
        let allValid = true;
        const inputs = document.querySelectorAll(`#section-${section} input[required], #section-${section} select[required], #section-${section} textarea[required]`);
        inputs.forEach(input => {
            let errorSpan = document.createElement("span");
            errorSpan.className = "error-message";
            errorSpan.style.color = "red";
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.style.border = "";
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains("error-message")) {
                        input.nextElementSibling.remove();
                    }
                }
            });
            if (!input.value.trim()) {
                input.style.border = "2px solid red";
                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("error-message")) {
                    errorSpan.innerText = "Este campo es obligatorio.";
                    input.parentNode.insertBefore(errorSpan, input.nextSibling);
                }
                allValid = false;
            }
        });
        return allValid;
    }

    // SECCIÓN 3: Satisfacción General
    document.getElementById("survey-form").addEventListener("submit", function (event) {
        const checkboxes = document.querySelectorAll('input[name="metodo_pago"]:checked');
        const errorSpan = document.getElementById("metodoPagoError");
        if (checkboxes.length === 0) {
            errorSpan.style.display = "inline";
            event.preventDefault();
        } else {
            errorSpan.style.display = "none";
        }
    });

    // SECCIÓN 4: Preferencias
    window.nextSection = function (section) {
        if (section === 1) {
            if (!validateName() || !validateEmail() || !validatePhone()) return;
        }
        if (!validateCurrentSection(section)) return;
        document.getElementById(`section-${section}`).style.display = "none";
        document.getElementById(`section-${section + 1}`).style.display = "block";
        saveData();
        currentSection++;
    };

    window.prevSection = function (section) {
        document.getElementById(`section-${section}`).style.display = "none";
        document.getElementById(`section-${section - 1}`).style.display = "block";
        currentSection--;
    };

    document.getElementById("survey-form").addEventListener("submit", function (event) {
        if (validateName() && validateEmail() && validatePhone() && validateCurrentSection(currentSection)) {
            alert("¡Gracias por completar la encuesta!");
        } else {
            alert("Por favor, corrige los errores antes de enviar.");
            event.preventDefault();
        }
    });

    const telefono = document.getElementById("telefono");
    telefono.addEventListener('input', function() {
        countPhoneNumbers();
        const telefonoError = document.getElementById("telefonoError");
        if (telefono.value.length <= 9) {
            telefonoError.style.display = "none";
        }
    });

    const email = document.getElementById("email");
    email.addEventListener('input', function() {
        const emailError = document.getElementById("emailError");
        if (validateEmail()) {
            emailError.style.display = "none";
        } else {
            emailError.style.display = "inline";
        }
    });

    loadData();
});
