document.addEventListener("DOMContentLoaded", function () {
    const filesByWeek = {
        "Semana 1": [
            {
                label: "Taller IA Historia (PDF)",
                path: "../Actividades/Actividad 1/Taller IA Historia.pdf"
            },,
            {
                label: "Taller IA Historia Respuestas (PDF)",
                path: "../Actividades/Actividad 1/Taller IA Historia R.pdf"
            },
            {
                label: "Noticia IA (TXT)",
                path: "../Actividades/Actividad 1/Noticia.txt"
            },
            {
                label: "Tour del Caballo (JAVA)",
                path: "../Actividades/Actividad 1/TourDelCaballo.java"
            }
        ],
        "Semana 2": [
            {
                label: "Algoritmo (PDF)",
                path: "../Actividades/Actividad 2/AHA.pdf"
            },
            {
                label: "Taller Tipologias IA (PDF)",
                path: "../Actividades/Actividad 2/Taller_Tipologias_IA.pdf"
            },
            {
                label: "Taller Tipologias IA Respuesta (PDF)",
                path: "../Actividades/Actividad 2/Taller_Tipologias_IA Respuestas.pdf"
            }
        ],
        "Parcial": [
            {
                label: "Parcial IA (PDF)",
                path: "../Actividades/Parcial/Parcial_IA.pdf"
            }
        ],
        "Articulo": [
            {
                label: "Articulo 10",
                path: "../Actividades/Articulo/Preliminares.pdf"
            },
            {
                label: "Resumen del Articulo",
                path: "../Actividades/Articulo/Resumen.pdf"
            }
        ],
        "Proyecto Imagenes": [
            {
                label: "Modelo",
                path: "../Actividades/ProImagenes/Modelo.pdf"
            }
        ],
        "Parcial 2": [
            {
                label: "Parcial2",
                path: "../Actividades/Parcial2/ResultadoEncuestas.pdf"
            }
        ],
        "Actividad de Mesa redonda": [
            {
                label: "Mesa Redonda",
                path: "../Actividades/Mesa Redonda/MESAREDONDA.pdf"
            }
        ],
        "Etica de la IA": [
            {
                label: "Actividad de las 50 preguntas",
                path: "../Actividades/50Preguntas/Etica50Preguntas.pdf"
            }
        ],
        "Parcial 3": [
            {
                label: "Automatizacion",
                path: "../Actividades/Parcial3/ProyectoAutomatizacionCristianBarrero.pdf"
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
            link.href = "#";
            link.textContent = fileObj.label; 
            link.onclick = () => mostrarArchivo(fileObj.path);
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
