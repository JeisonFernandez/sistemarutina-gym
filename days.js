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

    // Al hacer click en el SIGUIENTE día disponible
    dayBox.addEventListener("click", () => {
      if (i === currentDay + 1) {
        markDay();
      }
    });

    daysContainer.appendChild(dayBox);
  }
}

function markDay() {
  currentDay++;

  if (currentDay === 7) {
    // ¡Semana completada!
    currentDay = 0;
    totalWeeks++;
    alert("¡Semana completada! 🎉 Sumamos una más al contador.");
  }

  // Guardamos en la memoria del móvil
  localStorage.setItem("gym_day", currentDay);
  localStorage.setItem("gym_weeks", totalWeeks);

  initTracker(); // Refrescamos la vista
}

// Arrancamos al cargar la página
initTracker();
