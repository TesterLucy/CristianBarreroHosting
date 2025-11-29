document.addEventListener("DOMContentLoaded", function () {
    const filesByWeek = {
        "Carburador vs Full Inyection": [
            {
                label: "Manual de Ingeniería",
                path: "../Proyectos/Motos/CarboradoresvsFullInyection.pdf"
            },
            {
                label: "Archivo Principal",
                path: "../Proyectos/Motos/simulaciones.py"
            }
        ],
        "Calculo de Notas": [
            {
                label: "Link al Proyecto",
                path: "https://calcularnotafinal.vercel.app/"
            }
        ]
    };

    const fileList = document.getElementById("file-list");

    for (const semana in filesByWeek) {
        // Contenedor <li> para cada "Semana"
        let listItem = document.createElement("li");

        // Botón principal (ej: "Semana 1", "Semana 2", "Parcial")
        let button = document.createElement("button");
        button.textContent = semana;
        button.classList.add("week-btn");
        button.onclick = () => toggleMenu(semana);

        // Submenú <ul> oculto al inicio
        let subMenu = document.createElement("ul");
        subMenu.classList.add("submenu");
        subMenu.style.display = "none";
        subMenu.id = `submenu-${semana}`;

        // Agregar los archivos de la semana al submenú
        filesByWeek[semana].forEach(fileObj => {
            let subItem = document.createElement("li");
            let link = document.createElement("a");
            // Evita que el enlace recargue la página
            link.href = "javascript:void(0)";
            link.textContent = fileObj.label;

            // Click corregido
            link.onclick = (e) => {
                e.preventDefault();
                mostrarArchivo(fileObj.path);
            };

            subItem.appendChild(link);
            subMenu.appendChild(subItem);
        });
        listItem.appendChild(button);
        listItem.appendChild(subMenu);
        fileList.appendChild(listItem);
    }
});

/**
 * Mostrar/ocultar submenú
 */
function toggleMenu(semana) {
    let subMenu = document.getElementById(`submenu-${semana}`);
    if (subMenu) {
        subMenu.style.display = subMenu.style.display === "none" ? "block" : "none";
    }
}

/**
 * Mostrar archivo en iframe si es PDF, 
 * o abrir en nueva pestaña si es otro tipo (txt, java, etc.).
 */
function mostrarArchivo(ruta) {
    if (ruta.toLowerCase().endsWith(".pdf")) {
        // Mostramos el PDF en el contenedor
        document.getElementById("pdf-viewer").src = ruta;
        document.getElementById("pdf-container").style.display = "block";
    } else {
        // Para .txt, .java, etc., abrimos en nueva pestaña
        window.open(ruta, "_blank");
    }
}
