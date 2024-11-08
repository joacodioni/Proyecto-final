
const header = document.querySelector('.header'); 
const menuItems = document.querySelectorAll('.links li a'); 

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        header.classList.add('cambiar-color-header');
        menuItems.forEach(item => {
            item.style.color = '#2F3645'; 
            item.classList.add('scroll-sombra'); 
        });
    } else {
        header.classList.remove('cambiar-color-header');
        menuItems.forEach(item => {
            item.style.color = '#ffffff'; 
            item.classList.remove('scroll-sombra'); 
        });
    }
});

const video = document.getElementById('video-hist'); 
const imagenPortada = document.getElementById('portada');
const botonPlay = document.getElementById('boton-play');
const botonPausa = document.getElementById('boton-pausa');
const tiempoActualDisplay = document.getElementById('time-actual');
const duracionDisplay = document.getElementById('duracion');
const timeRestanteDisplay = document.getElementById('time-restante');
const buttons = document.querySelector('.buttons');

function formatearTiempo(segundos) {
    const mins = Math.floor(segundos / 60);
    const segs = Math.floor(segundos % 60);
    return `${mins < 10 ? '0' + mins : mins}:${segs < 10 ? '0' + segs : segs}`;
}

function actualizarTiempoRestante() {
    const timeRemaining = video.duration - video.currentTime;
    timeRestanteDisplay.textContent = `-${formatearTiempo(timeRemaining)}`;
}

function reproducirVideo() {
    imagenPortada.style.display = 'none';
    video.style.display = 'block';
    video.play();
    botonPlay.style.display = 'none';
    botonPausa.style.display = 'block';
}

function pausarVideo() {
    video.pause();
    botonPlay.style.display = 'block';
    botonPausa.style.display = 'none';
}

function actualizarTiempo() {
    tiempoActualDisplay.textContent = formatearTiempo(video.currentTime);
    duracionDisplay.textContent = formatearTiempo(video.duration);

    actualizarTiempoRestante();
}

function videoReady() {
    duracionDisplay.textContent = formatearTiempo(video.duration);
}

video.addEventListener('play', () => {
    buttons.style.display = 'flex';
});

video.addEventListener('pause', () => {
    buttons.style.display = 'flex';
});

video.addEventListener('timeupdate', actualizarTiempo);
video.addEventListener('loadedmetadata', videoReady);

botonPlay.addEventListener('click', reproducirVideo);
botonPausa.addEventListener('click', pausarVideo);

imagenPortada.addEventListener('click', reproducirVideo);


function allowDrop(event) {
    event.preventDefault();
}


function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const imageId = event.dataTransfer.getData("text");
    const image = document.getElementById(imageId);

    if (!event.target.querySelector("img")) {
        event.target.querySelector("p").style.display = "none";
        event.target.appendChild(image);
        verificarOrden(); 
    }
}

function verificarOrden() {
    const dropAreas = document.querySelectorAll(".drop-area");
    let correcto = true;

    dropAreas.forEach(dropArea => {
        const image = dropArea.querySelector("img");
        if (image) {
            const imagenIndex = image.getAttribute("data-index");
            const dropIndex = dropArea.getAttribute("data-index");
            if (imagenIndex !== dropIndex) {
                correcto = false;
            }
        } else {
            correcto = false;
        }
    });

    if (correcto) {
        setTimeout(() => {
            alert("¡Felicidades! Completaste el rompecabezas correctamente.");
        }, 100);
    }
}

function resetRompecabeza() {
    const galeriaImagenes = document.getElementById("galeria-img");
    const dropAreas = document.querySelectorAll(".drop-area");

    dropAreas.forEach(dropArea => {
        const image = dropArea.querySelector("img");
        if (image) {
            galeriaImagenes.appendChild(image);
        }
        dropArea.querySelector("p").style.display = "block"; 
    });
}

