const apiKey = "edad5ba13ce46f9a05df29b55714fdf3";
const city = "Kyiv";

async function getWeather() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ua`
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Помилка з API:", errorData);
      alert("Помилка: " + (errorData.message || "Невідома"));
      return;
    }

    const data = await res.json();

    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("feels").textContent = `Відчувається як: ${Math.round(data.main.feels_like)}°C`;
    document.getElementById("desc").textContent = data.weather[0].description;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById("details").innerHTML = `
      Вологість: ${data.main.humidity}%<br>
      Тиск: ${data.main.pressure} hPa<br>
      Вітер: ${data.wind.speed} м/с
    `;
  } catch (error) {
    console.error("фатальна помилка:", error);
    alert("не вдалося отримати дані погоди");
  }
}

function updateDateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString("uk-UA", { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString("uk-UA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date;
}

document.getElementById("refresh-btn").addEventListener("click", () => {
  getWeather();
  updateDateTime();
});
getWeather();
updateDateTime();
setInterval(updateDateTime, 60000);
