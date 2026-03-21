// register.js

const tg = window.Telegram.WebApp;

tg.ready();   // ← обязательно вызвать

tg.onEvent('ready', function () {
    const user = tg.initDataUnsafe?.user;

    if (user && user.id) {
        // Аватар
        const photo = document.getElementById("userPhoto");
        photo.src = user.photo_url || `https://via.placeholder.com/80?text=${user.first_name?.[0] || "?"}`;

        // Имя
        const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
        document.getElementById("userName").textContent = fullName || "Без имени";

        // @username
        document.getElementById("userUsername").textContent = 
            user.username ? "@" + user.username : "нет никнейма";

        // ID
        document.getElementById("userId").textContent = "ID: " + user.id;
    } else {
        document.getElementById("userName").textContent = "Нет данных пользователя";
        document.getElementById("userName").style.color = "orange";
        console.log("initDataUnsafe →", tg.initDataUnsafe); // ← для отладки
    }
    function showUserProfile() {
    const user = tg.initDataUnsafe?.user;
    if (user && user.id) {
        // ... тот же код заполнения полей ...
        console.log("Пользователь загружен:", user.id, user.username);
    } else {
        console.warn("Пользователь ещё не доступен", tg.initDataUnsafe);
        // можно поставить таймер на повторную попытку 1 раз
        setTimeout(showUserProfile, 400);
    }
}

if (tg.initDataUnsafe?.user) {
    showUserProfile();
} else {
    tg.ready();
    tg.onEvent('ready', showUserProfile);
    setTimeout(showUserProfile, 300); // запасной вариант
}
});
