jQuery('.drilldown').drilldown();

document.getElementById('btn-offcanvas').addEventListener('click', function() {
    var menuIcon = document.getElementById('menu-icon');
    if (menuIcon.classList.contains('bi-list')) {
        menuIcon.classList.remove('bi-list');
        menuIcon.classList.add('bi-x');
    } else {
        menuIcon.classList.remove('bi-x');
        menuIcon.classList.add('bi-list');
    }
});

document.getElementById("form-intervento").addEventListener("change", function() {
    var manutenzioneDiv = document.getElementById("section-intervento-manutenzione");
    var carrozzeriaDiv = document.getElementById("section-intervento-carrozzeria");

    // Nascondi entrambi i div all'inizio
    manutenzioneDiv.classList.add("d-none");
    carrozzeriaDiv.classList.add("d-none");

    // Mostra il div corretto in base alla selezione
    if (this.value === "manutenzione") {
        manutenzioneDiv.classList.remove("d-none");
    } else if (this.value === "carrozzeria") {
        carrozzeriaDiv.classList.remove("d-none");
    }
});





