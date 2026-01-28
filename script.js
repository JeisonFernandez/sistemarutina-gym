// 1. Variable global para el reproductor (importante para poder destruirlo)
let currentPlayer = null;

// "API" local de ejercicios
const exerciseAPI = {
  Flexiones: {
    desc: "Flexión adaptada. Baja lento (3–4s), sube apoyando rodillas. Mantén core y glúteos firmes. Progresión hacia flexión completa.",
    video: "",
  },

  "Remo mancuerna": {
    desc: "Ejercicio de espalda. Espalda recta, codo pegado al cuerpo, pausa 1s arriba y controla la bajada.",
    video: "",
  },

  "Sentadilla goblet": {
    desc: "Sentadilla con carga frontal. Rodillas abiertas, pecho erguido, baja controlado.",
    video: "",
  },

  "Hip thrust": {
    desc: "Glúteos e isquios. Empuja con talones y aprieta glúteos arriba sin arquear la espalda.",
    video: "",
  },

  "Puente de glúteo": {
    desc: "Variante en el suelo. Aprieta glúteos arriba y controla la bajada.",
    video: "",
  },

  "Elevación de hombros": {
    desc: "Trabajo de hombro. Movimiento controlado, sin balanceos. Mantén tensión constante.",
    video: "",
  },

  "Elevación hombros": {
    desc: "Trabajo de hombro. Movimiento controlado, sin balanceos. Mantén tensión constante.",
    video: "",
  },

  "Curl bíceps": {
    desc: "Bíceps. Sin impulso, sube controlado y baja en 3 segundos.",
    video:
      "https://github.com/JeisonFernandez/sistemarutina-gym/raw/refs/heads/main/videos/biceps-1.mp4",
  },

  "Extensión tríceps": {
    desc: "Tríceps. Codo fijo, extensión completa y contracción arriba.",
    video: "",
  },

  Plancha: {
    desc: "Core profundo. Abdomen y glúteos firmes, respiración controlada.",
    video: "",
  },

  "Sentadilla controlada": {
    desc: "Sentadilla sin carga priorizando técnica. Baja lento y estable.",
    video: "",
  },

  Zancadas: {
    desc: "Trabajo unilateral de piernas. Paso largo, torso erguido, control en la bajada.",
    video: "",
  },

  "Wall sit": {
    desc: "Isométrico de piernas. Espalda contra la pared, rodillas a 90°.",
    video: "",
  },

  "Hollow hold": {
    desc: "Core. Espalda baja pegada al suelo, abdomen activo, respiración corta.",
    video: "",
  },

  "Dead bug": {
    desc: "Core y estabilidad. Movimiento lento y controlado manteniendo abdomen firme.",
    video: "",
  },

  Caminata: {
    desc: "Actividad aeróbica ligera. Mantén postura erguida y ritmo constante.",
    video: "",
  },

  "Caminata ligera": {
    desc: "Versión suave de caminata. Ideal para días de recuperación.",
    video: "",
  },

  Estiramientos: {
    desc: "Movilidad y recuperación. Enfócate en respiración y rangos cómodos.",
    video: "",
  },

  "Abs suave": {
    desc: "Trabajo abdominal ligero. Sin llegar al fallo, enfocado en activación.",
    video: "",
  },
};

const modal = document.getElementById("exerciseModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");

document.addEventListener("click", (e) => {
  const exercise = e.target.closest(".exercise");
  if (!exercise) return;

  const span = exercise.querySelector("span");
  if (!span) return;

  const exerciseName = span.textContent.replace(":", "").trim();
  const data = exerciseAPI[exerciseName];

  modalTitle.textContent = exerciseName;

  modalContent.innerHTML = data
    ? `
    <p>${data.desc}</p>
    ${
      data.video
        ? `<video id="player" src="${data.video}" autoplay muted playsinline controls style="width:100%; margin-top:10px;"></video>`
        : `<div style="margin-top:10px; padding:20px; background:#f0f0f0; text-align:center; border-radius:8px;">
             <p style="color:#666; margin:0;">📹 Video no disponible por ahora</p>
           </div>`
    }`
    : `<p>No hay información todavía para este ejercicio.</p>`;

  // Mostramos el modal
  modal.style.display = "flex";

  // INICIALIZAMOS PLYR solo si existe el video en el DOM
  if (data && data.video) {
    // Si ya había un player de antes, lo limpiamos por si acaso
    if (currentPlayer) currentPlayer.destroy();

    currentPlayer = new Plyr("#player", {
      controls: ["play", "progress", "current-time", "mute", "fullscreen"],
      settings: [],
    });
  }
});

function closeModal() {
  // 1. Buscamos el video antes de borrar todo
  const video = modalContent.querySelector("video");
  if (currentPlayer) {
    currentPlayer.destroy();
    currentPlayer = null;
  }

  modal.style.display = "none";
  modalContent.innerHTML = ""; // Limpieza total del HTML
}
