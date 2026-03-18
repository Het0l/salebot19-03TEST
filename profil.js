document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram?.WebApp;
    const messageEl = document.getElementById("message");

    if (!tg) {
        document.getElementById("displayName").textContent = "НЕ в Telegram Mini App";
        document.getElementById("telegramInfo").textContent = "Откройте через бота";
        messageEl.textContent = "window.Telegram.WebApp не найден";
        messageEl.style.color = "orange";
        return;
    }

    tg.ready();
    tg.expand();

    const user = tg.initDataUnsafe?.user;

    console.log("Полный initDataUnsafe:", tg.initDataUnsafe);
    console.log("User объект:", user);

    if (!user || !user.id) {
        document.getElementById("displayName").textContent = "Данные пользователя не получены";
        document.getElementById("telegramInfo").textContent = "ID: — (проверьте запуск Mini App)";
        messageEl.textContent = "User пустой. Запустите через Main Mini App или меню-кнопку бота.";
        messageEl.style.color = "red";
        return;
    }

    // Аватар
    let photo = user.photo_url;
    if (!photo) {
        photo = `https://t.me/i/userpic/320/${user.id}.jpg`; // fallback — часто работает
    }
    const avatarEl = document.getElementById("avatar");
    avatarEl.src = photo;
    avatarEl.onerror = () => avatarEl.src = "https://via.placeholder.com/120?text=No+photo";

    // Имя / ник
    let name = user.username ? `@${user.username}` : `${user.first_name || ''} ${user.last_name || ''}`.trim();
    document.getElementById("displayName").textContent = name || "Без имени";

    // ID и премиум
    document.getElementById("telegramInfo").textContent = `ID: ${user.id} • Premium: ${user.is_premium ? 'Да' : 'Нет'}`;

    // Trade link — загрузка сохранённой
    const savedLink = localStorage.getItem(`steam_trade_${user.id}`);
    if (savedLink) {
        document.getElementById("tradeLink").value = savedLink;
        messageEl.textContent = "Ссылка уже сохранена";
        messageEl.style.color = "#4caf50";
    }

    // Сохранение
    document.getElementById("saveBtn").addEventListener("click", function () {
        const link = document.getElementById("tradeLink").value.trim();
        if (!link.includes("steamcommunity.com/tradeoffer/new/")) {
            messageEl.textContent = "Неправильный формат ссылки";
            messageEl.style.color = "orange";
            return;
        }
        localStorage.setItem(`steam_trade_${user.id}`, link);
        messageEl.textContent = "Ссылка сохранена!";
        messageEl.style.color = "#4caf50";
    });
});
