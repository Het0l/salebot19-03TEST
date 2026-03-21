// register.js

document.addEventListener("DOMContentLoaded", () => {
    // Получаем данные пользователя из Telegram Web App
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe?.user;

    if (user) {
        // Аватар
        const photo = document.getElementById("userPhoto");
        if (user.photo_url) {
            photo.src = user.photo_url;
        } else {
            photo.src = "https://via.placeholder.com/80?text=" + encodeURIComponent(user.first_name?.[0] || "?");
        }

        // Имя + фамилия
        const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
        document.getElementById("userName").textContent = fullName || "Без имени";

        // Username (никнейм)
        const usernameElem = document.getElementById("userUsername");
        if (user.username) {
            usernameElem.textContent = "@" + user.username;
        } else {
            usernameElem.textContent = "нет никнейма";
            usernameElem.style.color = "#999";
        }

        // ID
        document.getElementById("userId").textContent = "ID: " + user.id;
    } else {
        // Если по какой-то причине данных нет
        document.getElementById("userName").textContent = "Не удалось загрузить профиль";
        document.getElementById("userName").style.color = "red";
    }

    // Опционально: показываем, что приложение готово
    tg.ready();
});
