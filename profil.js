document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram?.WebApp;
    const displayNameEl = document.getElementById("displayName");
    const telegramInfoEl = document.getElementById("telegramInfo");
    const avatarEl = document.getElementById("avatar");
    const messageEl = document.getElementById("message");

    if (!tg) {
        displayNameEl.textContent = "НЕ в Telegram Web App";
        messageEl.textContent = "Откройте через бота в Telegram";
        messageEl.style.color = "orange";
        console.error("window.Telegram.WebApp НЕ существует");
        return;
    }

    tg.ready();
    tg.expand();

    console.log("Telegram WebApp версия:", tg.version);
    console.log("Полный initDataUnsafe:", JSON.stringify(tg.initDataUnsafe, null, 2));
    console.log("initDataUnsafe.user:", tg.initDataUnsafe?.user);

    const user = tg.initDataUnsafe?.user;

    if (!user || Object.keys(user).length === 0) {
        displayNameEl.textContent = "Пользователь не получен";
        telegramInfoEl.textContent = "initDataUnsafe.user пустой";
        messageEl.textContent = "Данные пользователя недоступны. Как запущен Mini App?";
        messageEl.style.color = "red";
        return;
    }

    // Аватар
    let photo = user.photo_url;
    console.log("photo_url из Telegram:", photo);

    if (!photo) {
        photo = `https://t.me/i/userpic/320/${user.id}.jpg`; // fallback
        console.log("Используем fallback аватар:", photo);
    }

    avatarEl.src = photo;
    avatarEl.onerror = () => {
        avatarEl.src = "https://via.placeholder.com/120?text=No+photo";
        console.warn("Аватар не загрузился даже fallback");
    };

    // Имя
    let name = user.username ? `@${user.username}` : `${user.first_name || ''} ${user.last_name || ''}`.trim();
    if (!name) name = "Без имени";

    displayNameEl.textContent = name;
    telegramInfoEl.textContent = `ID: ${user.id} • Premium: ${user.is_premium ? 'Да' : 'Нет'}`;

    // Trade link (оставляем как было)
    const savedLink = localStorage.getItem(`steam_trade_${user.id}`);
    if (savedLink) {
        document.getElementById("tradeLink").value = savedLink;
        messageEl.textContent = "Ссылка уже сохранена";
        messageEl.style.color = "#a3d5ff";
    }
    if (!user || Object.keys(user).length === 0) {
    displayNameEl.textContent = "User данные НЕ пришли";
    telegramInfoEl.textContent = "initDataUnsafe.user пустой или undefined";
    messageEl.innerHTML = `
        <strong>Отладка:</strong><br>
        WebApp версия: ${tg.version || 'нет'}<br>
        initDataUnsafe существует? ${!!tg.initDataUnsafe}<br>
        Полный initDataUnsafe: <pre style="white-space:pre-wrap; font-size:0.9rem; background:#000; padding:10px; border-radius:8px;">${JSON.stringify(tg.initDataUnsafe, null, 2)}</pre>
    `;
    messageEl.style.color = "orange";
    console.log("Отладка initDataUnsafe:", tg.initDataUnsafe);
    return;
}
});
