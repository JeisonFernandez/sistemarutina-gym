// Recuperamos datos guardados o empezamos de cero
let currentDay = parseInt(localStorage.getItem("gym_day")) || 0;
let totalWeeks = parseInt(localStorage.getItem("gym_weeks")) || 1;

const daysContainer = document.getElementById("days-container");
const weekDisplay = document.getElementById("week-count");

function initTracker() {
  renderDays();
  weekDisplay.textContent = totalWeeks;
}

function renderDays() {
  daysContainer.innerHTML = ""; // Limpiamos

  for (let i = 1; i <= 7; i++) {
    const dayBox = document.createElement("div");
    dayBox.className = "day-box";

    // Estilo base (puedes pasarlo a tu CSS)
    Object.assign(dayBox.style, {
      width: "24px",
      height: "24px",
      border: "2px solid #50e3c2",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: i <= currentDay ? "#50e3c2" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      color: "#000",
    });

    if (i <= currentDay) dayBox.textContent = "✓";

    // Dentro del bucle for (let i = 1; i <= 7; i++) de renderDays:

    dayBox.addEventListener("click", () => {
      // CASO 1: Queremos marcar el SIGUIENTE día
      if (i === currentDay + 1) {
        updateDay(1); // Suma 1
      }
      // CASO 2: Queremos desmarcar el ÚLTIMO día marcado
      else if (i === currentDay) {
        updateDay(-1); // Resta 1
      }
    });

    daysContainer.appendChild(dayBox);
  }
}

function updateDay(change) {
  currentDay += change;

  // Si acabas de marcar el séptimo día (currentDay pasa a ser 7)
  if (currentDay === 7) {
    // Pequeño delay para que el usuario vea el check antes del alert
    setTimeout(() => {
      alert("¡Semana completada! 🏋️‍♂️");
      currentDay = 0;
      totalWeeks++;

      // Guardamos y reiniciamos vista
      saveAndRefresh();
    }, 100);

    // Guardamos el 7 momentáneamente para que se pinte el check antes del reset
    saveAndRefresh();
    return;
  }

  // Evitar que baje de 0
  if (currentDay < 0) currentDay = 0;

  saveAndRefresh();
}

// Función auxiliar para no repetir código
function saveAndRefresh() {
  localStorage.setItem("gym_day", currentDay);
  localStorage.setItem("gym_weeks", totalWeeks);
  initTracker();
}

// Arrancamos al cargar la página
initTracker();

function confirmResetWeeks() {
  const modal = document.getElementById("exerciseModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  modalTitle.textContent = "⚠️ Resetear Progreso";

  // Inyectamos el mensaje y un botón especial de "Sí, resetear"
  modalContent.innerHTML = `
    <p>¿Estás seguro de que quieres volver todas las semanas y días a cero? Esta acción no se puede deshacer.</p>
    <button id="btn-confirm-reset" style="
      background: #ff4d4d; 
      color: white; 
      border: none; 
      padding: 10px 20px; 
      border-radius: 8px; 
      margin-top: 15px; 
      cursor: pointer;
      font-weight: bold;
    ">SÍ, REINICIAR TODO</button>
  `;

  modal.style.display = "flex";

  // Programamos el evento del botón de confirmación que acabamos de crear
  document.getElementById("btn-confirm-reset").addEventListener("click", () => {
    resetProgress();
    closeModal(); // Usamos tu función de cerrar de siempre
  });
}

function resetProgress() {
  // Limpiamos variables
  currentDay = 0;
  totalWeeks = 1;

  // Limpiamos LocalStorage
  localStorage.setItem("gym_day", 0);
  localStorage.setItem("gym_weeks", 1);

  // Actualizamos la interfaz
  initTracker();

  alert("Progreso reseteado correctamente.");
}
