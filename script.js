function iniciarJuego() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("juego").style.display = "block";
}

let vidasUsuario = 5;
let vidasPc = 5;

function jugar(eleccionUsuario) {
    const elecciones = ["manoPiedra", "manoPapel", "manoTijeras"];
    const eleccionPc = elecciones[Math.floor(Math.random() * 3)];

    document.getElementById("imagen-usuario").src = `img/${formatearNombre(eleccionUsuario)}.png`;
    document.getElementById("imagen-pc").src = `img/${formatearNombre(eleccionPc)}.png`;

    const resultado = determinarGanador(eleccionUsuario, eleccionPc);

    // Guardar vidas antes de cambiarlas
    const vidasUsuarioAntes = vidasUsuario;
    const vidasPcAntes = vidasPc;

    // Restar vidas si uno pierde
    if (resultado === "¡Ganaste!") {
        vidasPc--;
    } else if (resultado === "Perdiste...") {
        vidasUsuario--;
    }

    // Mostrar resultado
    document.getElementById("resultado").innerHTML = resultado;

    // Actualizar contadores en pantalla
    document.getElementById("contador-vidas-us").textContent = vidasUsuario;
    document.getElementById("contador-vidas-pc").textContent = vidasPc;

    // Actualizar barras de vida
    const anchoUsuario = (vidasUsuario / 5) * 430;
    const anchoPc = (vidasPc / 5) * 430;

    const barraUsuario = document.getElementById("barra-contadora-us");
    const barraPc = document.getElementById("barra-contadora-pc");

    barraUsuario.style.width = `${anchoUsuario}px`;
    barraPc.style.width = `${anchoPc}px`;

    // Solo animar la barra que perdió vida
    if (vidasUsuario < vidasUsuarioAntes) {
        animarBarra("barra-contadora-us");
    }
    if (vidasPc < vidasPcAntes) {
        animarBarra("barra-contadora-pc");
    }

    // Comprobar si alguien ya perdió todas las vidas
    if (vidasUsuario === 0 || vidasPc === 0) {
        finalizarJuego();
    }
}


// Esta función adapta el nombre para que coincida con la imagen del archivo
function formatearNombre(nombre) {
    if (nombre === "tijera") return "Tijeras"; // caso especial
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

function determinarGanador(usuario, pc) {
    if (usuario === pc) return "¡Empate!";
    if (
        (usuario === "manoPiedra" && pc === "manoTijeras") || 
        (usuario === "manoPapel" && pc === "manoPiedra") ||
        (usuario === "manoTijeras" && pc === "manoPapel")
    ) {
        return "¡Ganaste!";
    } else {
        return "Perdiste...";
    }
}

function actualizarBarrasDeVida() {
    const anchoMaxUsuario = 400;
    const anchoMaxPc = 400;

    const anchoUsuario = (vidasUsuario / 5) * anchoMaxUsuario;
    const anchoPc = (vidasPc / 5) * anchoMaxPc;

    document.getElementById("barra-contadora-us").style.width = `${anchoUsuario}px`;
    document.getElementById("barra-contadora-pc").style.width = `${anchoPc}px`;
}


function finalizarJuego() {
    let mensajeFinal = vidasUsuario === 0 ? "¡La computadora gana el juego! 😭" : "¡Ganaste el juego! 🎉";
    document.getElementById("resultado").innerHTML = mensajeFinal;

    // Desactivar botones para que no puedan seguir jugando
    document.getElementById("piedra").disabled = true;
    document.getElementById("papel").disabled = true;
    document.getElementById("tijera").disabled = true;
}




const maxVidas = 5;
const maxAncho = 430;
function animarBarra(barraId) {
    const barra = document.getElementById(barraId);
    barra.classList.remove("animar-daño"); // Elimina la animación anterior
    barra.offsetWidth; // Fuerza el reflow para reiniciar la animación
    barra.classList.add("animar-daño"); // Vuelve a agregar la animación
}


function actualizarBarrasDeVida() {
    const anchoUsuario = (vidasUsuario / 5) * 430;
    const anchoPc = (vidasPc / 5) * 430;

    const barraUsuario = document.getElementById("barra-contadora-us");
    const barraPc = document.getElementById("barra-contadora-pc");

    barraUsuario.style.width = `${anchoUsuario}px`;
    barraPc.style.width = `${anchoPc}px`;

    // Agregar animación de daño a las barras
    if (vidasUsuario < 5) {
        animarBarra("barra-contadora-us");
    }
    if (vidasPc < 5) {
        animarBarra("barra-contadora-pc");
    }
}