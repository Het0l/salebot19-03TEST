// register.js

document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;

    // Обязательно вызываем ready как можно раньше
    tg.ready();

    // Функция заполнения профиля
function fillProfile() {
    const user = tg.initDataUnsafe?.user || null;

    if (user && user.id) {
        // нормальная загрузка
        document.getElementById("userPhoto").src = user.photo_url || `https://via.placeholder.com/80?text=${user.first_name?.[0] || "?"}`;
        const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "Без имени";
        document.getElementById("userName").textContent = fullName;
        document.getElementById("userUsername").textContent = user.username ? "@" + user.username : "нет никнейма";
        document.getElementById("userId").textContent = "ID: " + user.id;
    } else {
        // fallback, если user нет
        document.getElementById("userPhoto").src = "https://via.placeholder.com/80?text=G";
        document.getElementById("userName").textContent = "Гость";
        document.getElementById("userUsername").textContent = "не авторизован";
        document.getElementById("userId").textContent = "ID: скрыт";
        document.getElementById("userName").style.color = "#888";
    }
}

// Вызываем сразу + на ready + через таймеры
fillProfile();
tg.onEvent('ready', fillProfile);
setTimeout(fillProfile, 500);
setTimeout(fillProfile, 1500);
});
