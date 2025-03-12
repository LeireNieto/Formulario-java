document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("form section");
    let currentSectionIndex = 0;
    
    sections.forEach((section, index) => {
        if (index !== 0) section.style.display = "none";
    });
    
    function showSection(index) {
        sections.forEach((section, i) => {
            section.style.display = i === index ? "block" : "none";
        });
    }
    
    sections.forEach((section, index) => {
        if (index < sections.length - 1) {
            const nextButton = document.createElement("button");
            nextButton.textContent = "Siguiente";
            nextButton.type = "button";
            nextButton.addEventListener("click", function() {
                showSection(index + 1);
            });
            section.appendChild(nextButton);
        }
    });
    
    document.getElementById("survey-form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let formData = new FormData(this);
        
        fetch("https://httpbin.org/post", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert("Encuesta enviada correctamente!");
            console.log(data);
        })
        .catch(error => {
            alert("Hubo un error al enviar la encuesta.");
            console.error("Error:", error);
        });
    });
    
    showSection(0);
});
