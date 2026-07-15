document.addEventListener("DOMContentLoaded", function () {
    crearTituloPrincipal();
    initAudioNativo();
    initVideoNativo();
    initProgressBar();
    initVolumeControl();
    initLightbox();
    initPlaylist();
    initCanvasFilter();
    initAudioVisualizer();
    initRecorder();
});

// --- 0. Título principal ---
function crearTituloPrincipal() {
    let contenedor = document.getElementById("titulo-principal");
    let titulo = document.createElement("h1");
    titulo.textContent = "Ejemplos de Manipulación de Audio y Video";
    contenedor.appendChild(titulo);
}

// --- 1. Audio Nativo ---
function initAudioNativo() {
    let seccion = document.getElementById("audio-nativo");

    let titulo = document.createElement("h2");
    titulo.textContent = "1. Audio Nativo";
    seccion.appendChild(titulo);

    let audio = document.createElement("audio");
    audio.controls = true;

    let fuente = document.createElement("source");
    fuente.src = "assets/audios/Black-hole-sun.mp3";
    fuente.type = "audio/mpeg";

    audio.appendChild(fuente);
    seccion.appendChild(audio);
}

// --- 2. Video Nativo ---
function initVideoNativo() {
    let seccion = document.getElementById("video-nativo");

    let titulo = document.createElement("h2");
    titulo.textContent = "2. Video Nativo";
    seccion.appendChild(titulo);

    let video = document.createElement("video");
    video.className = "video-chico"; // el ancho se define en CSS, no inline
    video.controls = true;

    let fuente = document.createElement("source");
    fuente.src = "assets/video/76765805.mp4";
    fuente.type = "video/mp4";

    video.appendChild(fuente);
    seccion.appendChild(video);
}

// --- 3. Barra de Progreso Sincronizada ---

function initProgressBar() {
    let seccion = document.getElementById("progreso");

    let titulo = document.createElement("h2");
    titulo.textContent = "3. Barra de Progreso Sincronizada";
    seccion.appendChild(titulo);

    let audio = new Audio("assets/audios/Black-hole-sun.mp3");

    let fila = document.createElement("div");
    fila.className = "fila-controles";

    let btnPlay = document.createElement("button");
    btnPlay.textContent = "▶";
    btnPlay.setAttribute("aria-label", "Reproducir o pausar");

    let barra = document.createElement("input");
    barra.type = "range";
    barra.min = "0";
    barra.max = "100";
    barra.value = "0";

    fila.appendChild(btnPlay);
    fila.appendChild(barra);
    seccion.appendChild(fila);

    btnPlay.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    // El ícono del botón refleja el estado real del audio,
    // así queda correcto aunque el audio termine solo.
    audio.addEventListener("play", function () {
        btnPlay.textContent = "⏸";
    });
    audio.addEventListener("pause", function () {
        btnPlay.textContent = "▶";
    });
    audio.addEventListener("ended", function () {
        btnPlay.textContent = "▶";
    });

    // El audio empuja la barra mientras se reproduce.
    audio.addEventListener("timeupdate", function () {
        if (!isNaN(audio.duration)) {
            barra.value = (audio.currentTime / audio.duration) * 100;
        }
    });

    // El usuario también puede arrastrar la barra para "saltar" de posición.
    barra.addEventListener("input", function () {
        if (!isNaN(audio.duration)) {
            audio.currentTime = (barra.value / 100) * audio.duration;
        }
    });
}

// --- 4. Control de Volumen ---
function initVolumeControl() {
    let seccion = document.getElementById("volumen");

    let titulo = document.createElement("h2");
    titulo.textContent = "4. Control de Volumen";
    seccion.appendChild(titulo);

    let audio = new Audio("assets/audios/Black-hole-sun.mp3");
    audio.loop = true;

    let fila = document.createElement("div");
    fila.className = "fila-controles";

    let btnPlay = document.createElement("button");
    btnPlay.textContent = "▶ Reproducir";

    let volumen = document.createElement("input");
    volumen.type = "range";
    volumen.min = "0";
    volumen.max = "1";
    volumen.step = "0.1";
    volumen.value = "1";

    fila.appendChild(btnPlay);
    fila.appendChild(volumen);
    seccion.appendChild(fila);

    btnPlay.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            btnPlay.textContent = "⏸ Pausar";
        } else {
            audio.pause();
            btnPlay.textContent = "▶ Reproducir";
        }
    });

    volumen.addEventListener("input", function (evento) {
        audio.volume = Number(evento.target.value);
    });
}

// --- 5. Video con Lightbox ---
// Toda la apariencia del modal vive en la clase CSS ".video-lightbox";
function initLightbox() {
    let seccion = document.getElementById("lightbox");

    let titulo = document.createElement("h2");
    titulo.textContent = "5. Video con Lightbox";
    seccion.appendChild(titulo);

    let btnAbrir = document.createElement("button");
    btnAbrir.textContent = "Abrir Video";
    seccion.appendChild(btnAbrir);

    let modal = document.createElement("div");
    modal.className = "video-lightbox";

    let video = document.createElement("video");
    video.src = "assets/video/76765805.mp4";
    video.controls = true;

    modal.appendChild(video);
    document.body.appendChild(modal);

    btnAbrir.addEventListener("click", function () {
        modal.className = "video-lightbox activo";
        video.play();
    });

    // Cerrar solo si se clickea el fondo oscuro, no el video en sí
    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            modal.className = "video-lightbox";
            video.pause();
        }
    });
}

// --- 6. Reproductor tipo Playlist ---
// Botones de anterior/siguiente, nombre de la pista visible,
function initPlaylist() {
    let nombresPistas = ["Black Hole Sun", "Work"];
    let archivosPistas = ["Black-hole-sun.mp3", "Work.mp3"];

    let seccion = document.getElementById("playlist");

    let titulo = document.createElement("h2");
    titulo.textContent = "6. Reproductor tipo Playlist";
    seccion.appendChild(titulo);

    let nombrePista = document.createElement("p");
    nombrePista.className = "nombre-pista";
    seccion.appendChild(nombrePista);

    let fila = document.createElement("div");
    fila.className = "fila-controles";

    let btnAnterior = document.createElement("button");
    btnAnterior.textContent = "⏮ Anterior";

    let btnPlay = document.createElement("button");
    btnPlay.textContent = "▶";

    let btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente ⏭";

    fila.appendChild(btnAnterior);
    fila.appendChild(btnPlay);
    fila.appendChild(btnSiguiente);
    seccion.appendChild(fila);

    let audio = new Audio();
    let indice = 0;

    function cargarPista(nuevoIndice) {
        // Si el índice se pasa de largo, volvemos al principio.
        // Si el índice es negativo, vamos al final de la lista.
        if (nuevoIndice >= archivosPistas.length) {
            nuevoIndice = 0;
        } else if (nuevoIndice < 0) {
            nuevoIndice = archivosPistas.length - 1;
        }
        indice = nuevoIndice;
        audio.src = "assets/audios/" + archivosPistas[indice];
        nombrePista.textContent = "🎵 " + nombresPistas[indice];
    }

    cargarPista(0);

    btnPlay.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });
    audio.addEventListener("play", function () {
        btnPlay.textContent = "⏸";
    });
    audio.addEventListener("pause", function () {
        btnPlay.textContent = "▶";
    });

    btnSiguiente.addEventListener("click", function () {
        cargarPista(indice + 1);
        audio.play();
    });
    btnAnterior.addEventListener("click", function () {
        cargarPista(indice - 1);
        audio.play();
    });

    // Al terminar una pista, pasa sola a la próxima
    audio.addEventListener("ended", function () {
        cargarPista(indice + 1);
        audio.play();
    });
}

// --- 7. Video en Vivo con Canvas (NUEVO) ---
// El <video> real queda oculto; lo que se ve es un <canvas> que se
// redibuja cuadro a cuadro con requestAnimationFrame. Los filtros

function initCanvasFilter() {
    let seccion = document.getElementById("canvas-filtro");

    let titulo = document.createElement("h2");
    titulo.textContent = "7. Video en Vivo con Canvas";
    seccion.appendChild(titulo);

    let video = document.createElement("video");
    video.src = "assets/video/76765805.mp4";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.className = "oculto"; // el video posta no se muestra, solo alimenta al canvas

    let canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 270;
    canvas.className = "marco-canvas";
    let ctx = canvas.getContext("2d");

    let filaFiltros = document.createElement("div");
    filaFiltros.className = "fila-controles";

    let filtroActivo = "normal";
    let nombresFiltros = ["normal", "grises", "invertido"];

    for (let i = 0; i < nombresFiltros.length; i++) {
        let boton = document.createElement("button");
        boton.textContent = nombresFiltros[i];
        boton.setAttribute("data-filtro", nombresFiltros[i]);
        boton.addEventListener("click", function (evento) {
            filtroActivo = evento.target.getAttribute("data-filtro");
        });
        filaFiltros.appendChild(boton);
    }

    var btnPlay = document.createElement("button");
    btnPlay.textContent = "▶ Reproducir";
    btnPlay.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            btnPlay.textContent = "⏸ Pausar";
        } else {
            video.pause();
            btnPlay.textContent = "▶ Reproducir";
        }
    });

    seccion.appendChild(video);
    seccion.appendChild(canvas);
    seccion.appendChild(filaFiltros);
    seccion.appendChild(btnPlay);

    function dibujarCuadro() {
        if (!video.paused && !video.ended) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            if (filtroActivo !== "normal") {
                let cuadro = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let datos = cuadro.data; // [r,g,b,a, r,g,b,a, ...] por cada pixel

                for (let j = 0; j < datos.length; j += 4) {
                    let r = datos[j];
                    let g = datos[j + 1];
                    let b = datos[j + 2];

                    if (filtroActivo === "grises") {
                        let promedio = (r + g + b) / 3;
                        datos[j] = promedio;
                        datos[j + 1] = promedio;
                        datos[j + 2] = promedio;
                    } else if (filtroActivo === "invertido") {
                        datos[j] = 255 - r;
                        datos[j + 1] = 255 - g;
                        datos[j + 2] = 255 - b;
                    }
                }
                ctx.putImageData(cuadro, 0, 0);// putImageData es un metodo que dibuja los datos de imagen en el canvas
            }
        }
        requestAnimationFrame(dibujarCuadro);
    }
    dibujarCuadro();
}

// --- 8. Visualizador con Web Audio API (NUEVO) ---

function initAudioVisualizer() {
    let seccion = document.getElementById("visualizador");

    let titulo = document.createElement("h2");
    titulo.textContent = "8. Visualizador con Web Audio API";
    seccion.appendChild(titulo);

    let audio = new Audio("assets/audios/Work.mp3");

    let btnPlay = document.createElement("button");
    btnPlay.textContent = "▶ Reproducir";
    seccion.appendChild(btnPlay);

    let canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 120;
    canvas.className = "canvas-visualizador";
    seccion.appendChild(canvas);
    let ctx = canvas.getContext("2d");// get context metodo que devuelve un objeto que permite dibujar en el canvas

    let audioCtx = null;
    let analizador = null;
    let datosFrecuencia = null;

    function configurarAudioContext() {
        if (audioCtx !== null) {
            return; // ya está armado, no lo recreamos de nuevo
        }

        audioCtx = new AudioContext();
        let fuente = audioCtx.createMediaElementSource(audio);
        analizador = audioCtx.createAnalyser();
        analizador.fftSize = 64; // resolución del análisis (a menor valor, menos barras)

        fuente.connect(analizador);// connect es un metodo que conecta un nodo de audio a otro, en este caso conecta la fuente de audio al analizador
        analizador.connect(audioCtx.destination); // sin esto no se escucharía nada

        datosFrecuencia = new Uint8Array(analizador.frequencyBinCount);
    }

    function dibujarBarras() {
        requestAnimationFrame(dibujarBarras);
        if (analizador === null) {
            return;
        }

        analizador.getByteFrequencyData(datosFrecuencia);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var anchoBarra = canvas.width / datosFrecuencia.length;
        for (var i = 0; i < datosFrecuencia.length; i++) {
            var valor = datosFrecuencia[i];
            var alto = (valor / 255) * canvas.height;
            ctx.fillStyle = "#c6f062";
            ctx.fillRect(i * anchoBarra, canvas.height - alto, anchoBarra - 2, alto);
        }
    }
    dibujarBarras();

    btnPlay.addEventListener("click", function () {
        configurarAudioContext();
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        if (audio.paused) {
            audio.play();
            btnPlay.textContent = "⏸ Pausar";
        } else {
            audio.pause();
            btnPlay.textContent = "▶ Reproducir";
        }
    });
}

// --- 9. Grabación con MediaRecorder (NUEVO) ---
function initRecorder() {
    let seccion = document.getElementById("grabador");

    let titulo = document.createElement("h2");
    titulo.textContent = "9. Grabación con MediaRecorder";
    seccion.appendChild(titulo);

    let info = document.createElement("p");
    info.className = "nombre-pista";
    info.textContent = 'Presioná "Iniciar" y autorizá el uso de cámara y micrófono.';
    seccion.appendChild(info);

    let preview = document.createElement("video");
    preview.autoplay = true;
    preview.muted = true;
    preview.className = "preview-grabador";
    seccion.appendChild(preview);

    let fila = document.createElement("div");
    fila.className = "fila-controles";

    let btnIniciar = document.createElement("button");
    btnIniciar.textContent = "● Iniciar grabación";

    let btnDetener = document.createElement("button");
    btnDetener.textContent = "■ Detener";
    btnDetener.disabled = true;

    fila.appendChild(btnIniciar);
    fila.appendChild(btnDetener);
    seccion.appendChild(fila);

    let enlaceDescarga = document.createElement("a");
    enlaceDescarga.className = "oculto";
    enlaceDescarga.textContent = "Descargar grabación";
    seccion.appendChild(enlaceDescarga);

    let mediaRecorder = null;
    let fragmentos = [];

    btnIniciar.addEventListener("click", function () {
        let promesaPermiso = navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        promesaPermiso.then(function (stream) {
            preview.srcObject = stream;

            fragmentos = [];
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.addEventListener("dataavailable", function (evento) {
                if (evento.data.size > 0) {
                    fragmentos.push(evento.data);
                }
            });

            mediaRecorder.addEventListener("stop", function () {
                var blob = new Blob(fragmentos, { type: "video/webm" });
                enlaceDescarga.href = URL.createObjectURL(blob);
                enlaceDescarga.download = "grabacion.webm";
                enlaceDescarga.className = "";
                info.textContent = "¡Listo! Ya podés descargar tu grabación.";

                // liberamos cámara y micrófono al terminar
                var pistas = stream.getTracks();
                for (var i = 0; i < pistas.length; i++) {
                    pistas[i].stop();
                }
            });

            mediaRecorder.start();
            btnIniciar.disabled = true;
            btnDetener.disabled = false;
            info.textContent = "Grabando...";
        });

        promesaPermiso.catch(function (error) {
            info.textContent = "No se pudo acceder a la cámara/micrófono: " + error.message;
        });
    });

    btnDetener.addEventListener("click", function () {
        mediaRecorder.stop();
        btnIniciar.disabled = false;
        btnDetener.disabled = true;
    });
}