document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("survey-form");  // Asegúrate de que tu formulario tenga este ID
    const horaInicio = document.getElementById('hora_inicio');
    const horaFin = document.getElementById('hora_fin');
    const horaError = document.getElementById('horaError');  // El div de error

    // Validación para comprobar que la hora de inicio es menor que la de fin
    form.addEventListener("submit", function (event) {
        const horaInicioValue = horaInicio.value;
        const horaFinValue = horaFin.value;

        if (horaInicioValue >= horaFinValue) {
            horaError.style.display = "inline";  // Mostrar mensaje de error
            event.preventDefault();  // Previene el envío del formulario
        } else {
            horaError.style.display = "none";  // Ocultar mensaje de error si es válido
        }
    });

    // Ajustar la hora de fin automáticamente cuando la de inicio se cambie
    horaInicio.addEventListener('input', function() {
        const horaInicioValue = horaInicio.value;
        const horaFinValue = horaFin.value;

        // Si la hora de inicio es mayor o igual a la de fin, ajustar la hora de fin a una posterior
        if (horaInicioValue >= horaFinValue) {
            let nuevaHora = new Date();
            nuevaHora.setHours(parseInt(horaInicioValue.split(":")[0]) + 1, parseInt(horaInicioValue.split(":")[1]));

            // Ajustar la hora de fin para que siempre sea posterior a la de inicio
            horaFin.value = nuevaHora.toTimeString().slice(0, 5);
            horaError.style.display = "inline";  // Mostrar mensaje de error
        } else {
            horaError.style.display = "none";  // Ocultar mensaje de error si el rango es válido
        }
    });
}); 