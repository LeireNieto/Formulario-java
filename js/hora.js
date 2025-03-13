document.addEventListener("DOMContentLoaded", function () {
    const horaInicio = document.getElementById("hora_inicio");
    const horaFin = document.getElementById("hora_fin");
    const horaError = document.getElementById("horaError"); // Suponiendo que tienes un mensaje de error con este ID

    // Verificar que la hora de inicio no sea mayor que la hora de fin
    function validateHora() {
        if (horaInicio && horaFin) {
            const startTime = horaInicio.value;
            const endTime = horaFin.value;

            // Si la hora de inicio es mayor que la hora de fin
            if (startTime && endTime && startTime >= endTime) {
                horaError.style.display = "inline"; // Mostrar mensaje de error
                horaInicio.style.border = "2px solid red";
                horaFin.style.border = "2px solid red";
                return false;
            }

            // Si todo es correcto, ocultar el mensaje de error
            horaError.style.display = "none";
            horaInicio.style.border = "";
            horaFin.style.border = "";
            return true;
        }
        return true;
    }

    // Evento de cambio para validar cuando el usuario cambia la hora
    horaInicio.addEventListener('input', validateHora);
    horaFin.addEventListener('input', validateHora);

    // Validación de la hora cuando se envía el formulario
    document.getElementById("survey-form").addEventListener("submit", function (event) {
        if (!validateHora()) {
            event.preventDefault(); // Evitar el envío si hay error
        }
    });
});
