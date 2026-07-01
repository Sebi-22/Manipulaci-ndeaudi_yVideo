document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Título ---
    function elGrandote() {
        const title = document.createElement("h1");
        const contenedor = document.getElementById("prueba");
        title.innerHTML = "Ejemplos de Manipulación de Audio y Video";
        contenedor.appendChild(title);
    }
    elGrandote();

    // --- 2. Audio Nativo ---
    function setupTagsOne() {
        const title = document.createElement("h2");
        const seccion = document.querySelector(".uno");
        title.innerHTML = "1. Audio Nativo";
        seccion.appendChild(title);

        const audio = document.createElement("audio");
        audio.setAttribute("controls", "");
        const fuente = document.createElement("source");
        fuente.src = "assets/audios/Black-hole-sun.mp3";
        fuente.type = "audio/mpeg";
        audio.appendChild(fuente);
        seccion.appendChild(audio);
    }
    setupTagsOne();

    // --- 3. Video Nativo ---
    function setupTagsTwo() {
        const title = document.createElement("h2");
        const seccion = document.querySelector(".dos");
        title.innerHTML = "2. Video Nativo";
        seccion.appendChild(title);

        const video = document.createElement("video");
        video.style.width = "300px";
        video.setAttribute("controls", "");
        const fuente = document.createElement("source");
        fuente.src = "assets/video/vigilante.mp4";
        fuente.type = "video/mp4";
        video.appendChild(fuente);
        seccion.appendChild(video);
    }
    setupTagsTwo();

    // --- 4. Barra de progreso sincronizada ---
    function barraSincronizacion() {
        const seccion = document.querySelector(".tres");
        seccion.innerHTML = "<h2>3. Barra de progreso</h2>";
        
        const audio = document.createElement("audio");
        audio.id = "audioProgress";
        audio.src = "assets/audios/Black-hole-sun.mp3";
        seccion.appendChild(audio);

        const btn = document.createElement("button");
        btn.id = "playBtn";
        btn.innerHTML = "▶";
        seccion.appendChild(btn);

        const input = document.createElement("input");
        input.type = "range";
        input.id = "progressBar";
        input.value = 0;
        seccion.appendChild(input);

        btn.addEventListener("click", () => {
            audio.paused ? audio.play() : audio.pause();
            btn.innerHTML = audio.paused ? "▶" : "⏸";
        });

        audio.addEventListener("timeupdate", () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            input.value = percent || 0;
        });
    }
    barraSincronizacion();

    // --- 5. Barra de volumen ---
    function barraVolumen() {
        const seccion = document.querySelector(".cuatro");
        seccion.innerHTML = "<h2>4. Control de Volumen</h2>";
        
        const audio = new Audio("assets/audios/Black-hole-sun.mp3");
        const volInput = document.createElement("input");
        volInput.type = "range";
        volInput.min = "0";
        volInput.max = "1";
        volInput.step = "0.1";
        volInput.value = "1";
        
        seccion.appendChild(volInput);
        volInput.addEventListener("input", (e) => audio.volume = e.target.value);
    }
    barraVolumen();

    // --- 6. Lightbox de Video ---
    function setupLightbox() {
        const seccion = document.querySelector(".cinco");
        seccion.innerHTML = "<h2>5. Video con Lightbox</h2>";
        
        const btn = document.createElement("button");
        btn.innerHTML = "Abrir Video";
        seccion.appendChild(btn);

        const modal = document.createElement("div");
        modal.style.display = "none";
        modal.style.position = "fixed";
        modal.style.top = "0"; modal.style.left = "0";
        modal.style.width = "100%"; modal.style.height = "100%";
        modal.style.background = "rgba(0,0,0,0.8)";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        
        const video = document.createElement("video");
        video.src = "assets/video/vigilante.mp4";
        video.controls = true;
        modal.appendChild(video);
        document.body.appendChild(modal);

        btn.onclick = () => { modal.style.display = "flex"; video.play(); };
        modal.onclick = (e) => { if(e.target === modal) { modal.style.display = "none"; video.pause(); }};
    }
    setupLightbox();

    // --- 7. Slider de audios ---
    function sliderHex() {
        const seccion = document.querySelector(".seis");
        seccion.innerHTML = "<h2>6. Reproductor tipo Slider</h2>";
        
        const audio = new Audio();
        const btnNext = document.createElement("button");
        btnNext.innerHTML = "Siguiente Pista";
        seccion.appendChild(btnNext);
        
        const tracks = ["Black-hole-sun.mp3", "Work.mp3"];
        let index = 0;
        
        btnNext.onclick = () => {
            index = (index + 1) % tracks.length;
            audio.src = "assets/audios/" + tracks[index];
            audio.play();
        };
    }
    sliderHex();

});