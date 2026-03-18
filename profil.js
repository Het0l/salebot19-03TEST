document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram?.WebApp;
    const displayName = document.getElementById("displayName");
    const telegramInfo = document.getElementById("telegramInfo");
    const message = document.getElementById("message");

    if (!tg) {
        displayName.textContent = "НЕ в Telegram Mini App";
        telegramInfo.textContent = "window.Telegram.WebApp не найден";
        message.textContent = "Запустите через кнопку Launch App в профиле бота";
        message.style.color = "orange";
        return;
    }

    tg.ready();
    tg.expand();

    const unsafe = tg.initDataUnsafe || {};
    const user = unsafe.user || {};

    console.log("initDataUnsafe полный:", unsafe);
    console.log("User:", user);

    if (Object.keys(user).length === 0) {
        displayName.textContent = "User пустой";
        telegramInfo.textContent = "Данные не пришли";
        message.innerHTML = `initDataUnsafe: <pre>${JSON.stringify(unsafe, null, 2)}</pre>`;
        message.style.color = "red";
        return;
    }

    // Аватар
    let photo = user.photo_url || `https://t.me/i/userpic/320/${user.id}.jpg`;
    document.getElementById("avatar").src = photo;

    // Имя
    let name = user.username ? `@${user.username}` : `${user.first_name || ''} ${user.last_name || ''}`.trim();
    displayName.textContent = name || "Без имени";

    telegramInfo.textContent = `ID: ${user.id || '—'} • Premium: ${user.is_premium ? 'Да' : 'Нет'}`;
});
