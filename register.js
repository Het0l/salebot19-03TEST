// register.js

document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;

    // Обязательно вызываем ready как можно раньше
    tg.ready();

    // Функция заполнения профиля
    function fillProfile() {
        const user = tg.initDataUnsafe?.user;

        if (user && user.id) {
            // Аватар
            const photo = document.getElementById("userPhoto");
            photo.src = user.photo_url || `https://via.placeholder.com/80?text=${encodeURIComponent(user.first_name?.[0] || "?")}`;

            // Имя + фамилия
            const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
            document.getElementById("userName").textContent = fullName || "Без имени";

            // Username
            document.getElementById("userUsername").textContent = 
                user.username ? "@" + user.username : "нет никнейма";

            // ID
            document.getElementById("userId").textContent = "ID: " + user.id;

            console.log("Профиль успешно загружен →", user.id, user.username || "без ника");
        } else {
            document.getElementById("userName").textContent = "Нет данных пользователя";
            document.getElementById("userName").style.color = "orange";

            console.warn("initDataUnsafe.user отсутствует");
            console.log("Полный initDataUnsafe:", tg.initDataUnsafe);
        }
    }

    // Пробуем сразу (иногда данные уже есть)
    if (tg.initDataUnsafe?.user?.id) {
        fillProfile();
    } else {
        // Ждём события ready (на случай задержки)
        tg.onEvent('ready', () => {
            fillProfile();
        });

        // Запасной вариант — через 300–800 мс (на слабых устройствах / iOS бывает задержка)
        setTimeout(fillProfile, 400);
        setTimeout(fillProfile, 800);
    }

    // Полезно для отладки — расширяем окно
    tg.expand();
});
