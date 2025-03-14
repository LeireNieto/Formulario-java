document.addEventListener("DOMContentLoaded", function () {
    let currentSection = 1;
    // Validación del nombre
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
    // Validación del correo electrónico
    function validateEmail() {
        const email = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;  // Verifica que tenga @ y .
        
        if (!regex.test(email.value)) {
            emailError.style.display = "inline";
            email.style.border = "2px solid red";
            return false;
        }
        emailError.style.display = "none";
        email.style.border = "";
        return true;
    }

    // Validación del teléfono
    function validatePhone() {
        const telefono = document.getElementById("telefono");
        const telefonoError = document.getElementById("telefonoError");
        const regex = /^[0-9]{9}$/; // Solo permite números
        
        if (!regex.test(telefono.value)) {
            telefonoError.style.display = "inline";
            telefono.style.border = "2px solid red";
            return false;
        }
        telefonoError.style.display = "none";
        telefono.style.border = "";
        return true;
    }

    // Función para contar los números de teléfono
    function countPhoneNumbers() {
        const telefono = document.getElementById("telefono");
        const numberCount = document.getElementById("numberCount");

        // Contar la longitud del valor del teléfono
        const phoneLength = telefono.value.length;
        numberCount.textContent = `Has escrito ${phoneLength} números.`;

        // Limitar a 9 caracteres para el teléfono
        if (phoneLength > 9) {
            telefono.value = telefono.value.substring(0, 9); // Cortar a 9 caracteres
        }
    }

    // Guardar los datos de cada sección
    function saveData() {
        const inputs = document.querySelectorAll(`#section-${currentSection} input, #section-${currentSection} select, #section-${currentSection} textarea`);
        inputs.forEach(input => {
            localStorage.setItem(input.name, input.value);
        });
    }

    // Validar los campos obligatorios de la sección actual
    function validateCurrentSection(section) {
        let allValid = true;
        const inputs = document.querySelectorAll(`#section-${section} input[required], #section-${section} select[required], #section-${section} textarea[required]`);

        inputs.forEach(input => {
            let errorSpan = document.createElement("span");
            errorSpan.className = "error-message";
            errorSpan.style.color = "red";

            // Función para limpiar los errores mientras el usuario escribe
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.style.border = ""; // Quitar borde rojo
                    // Eliminar mensaje de error
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains("error-message")) {
                        input.nextElementSibling.remove();
                    }
                }
            });

            // Si el campo está vacío, mostrar el mensaje de error
            if (!input.value.trim()) {
                input.style.border = "2px solid red"; // Resaltar el borde en rojo

                // Si no existe un mensaje de error, insertarlo después del campo
                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("error-message")) {
                    errorSpan.innerText = "Este campo es obligatorio.";
                    input.parentNode.insertBefore(errorSpan, input.nextSibling);
                }

                allValid = false; // Si algún campo no es válido, no permitir el avance
            } else {
                input.style.border = ""; // Quitar el borde rojo si el campo es válido
                // Si existe un mensaje de error, eliminarlo
                if (input.nextElementSibling && input.nextElementSibling.classList.contains("error-message")) {
                    input.nextElementSibling.remove();
                }
            }
        });

        return allValid; // Retorna si todos los campos son válidos
    }

    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("survey-form"); // Asegúrate de que tu formulario tenga este ID
    
        form.addEventListener("submit", function (event) {
            const checkboxes = document.querySelectorAll('input[name="metodo_pago"]:checked');
            const errorSpan = document.getElementById("metodoPagoError");
    
            // Verificar si al menos un checkbox está seleccionado
            if (checkboxes.length === 0) {
                errorSpan.style.display = "inline"; // Mostrar el mensaje de error
                event.preventDefault(); // Evitar el envío del formulario
            } else {
                errorSpan.style.display = "none"; // Ocultar el mensaje de error si al menos uno está seleccionado
            }
        });
    });

    // Función para pasar a la siguiente sección
    window.nextSection = function (section) {
        // Validación para los campos de la sección actual
        if (section === 1) {
            if (!validateName()) return;
            if (!validateEmail() || !validatePhone()) return;
        }
        
        if (!validateCurrentSection(section)) return;

        // Ocultar la sección actual y mostrar la siguiente
        document.getElementById(`section-${section}`).style.display = "none";
        document.getElementById(`section-${section + 1}`).style.display = "block";
        saveData();
        currentSection++;
    };
    // Escuchar cambios en el campo del nombre para eliminar errores en tiempo real
    document.getElementById("name").addEventListener("input", function () {
        validateName();
    });
    // Función para volver a la sección anterior
    window.prevSection = function (section) {
        document.getElementById(`section-${section}`).style.display = "none";
        document.getElementById(`section-${section - 1}`).style.display = "block";
        currentSection--;
    };

    // Validar y mostrar mensaje de agradecimiento al finalizar la encuesta
    document.getElementById("survey-form").addEventListener("submit", function (event) {
        if (validateName() && validateEmail() && validatePhone() && validateCurrentSection(currentSection)) {
            alert("¡Gracias por completar la encuesta!");
            // Aquí puedes agregar lógica adicional si deseas enviar los datos a un servidor
        } else {
            alert("Por favor, corrige los errores antes de enviar.");
            event.preventDefault(); // Evitar el envío del formulario si hay errores
        }
    });

    // Escuchar el input del teléfono para contar los números
    const telefono = document.getElementById("telefono");
    telefono.addEventListener('input', function() {
        // Contar los números
        countPhoneNumbers();
        
        // Si el teléfono tiene más de 9 caracteres, ocultar el mensaje de error
        const telefonoError = document.getElementById("telefonoError");
        if (telefono.value.length <= 9) {
            telefonoError.style.display = "none"; // Ocultar error si está escribiendo
        }
    });

    // Escuchar el input del correo para ocultar el error mientras se escribe
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    email.addEventListener('input', function() {
        // Si el correo es válido, ocultar el mensaje de error
        if (validateEmail()) {
            emailError.style.display = "none";  // Ocultar el error
        } else {
            emailError.style.display = "inline";  // Mostrar el error si el correo es inválido
        }
    });

    loadData();
});
