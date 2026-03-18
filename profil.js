// profil.js

document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram?.WebApp;
    let user = null;

    if (tg) {
        tg.ready();
        tg.expand(); // растягиваем на весь экран

        user = tg.initDataUnsafe?.user;

        if (user) {
            // Аватар
            let photo = user.photo_url;
            if (!photo) {
                // fallback (работает не у всех, но попробовать стоит)
                photo = `https://t.me/i/userpic/320/${user.id}.jpg`;
            }

            const avatarEl = document.getElementById("avatar");
            avatarEl.src = photo;
            avatarEl.onerror = () => {
                avatarEl.src = "https://via.placeholder.com/120?text=No+photo";
            };

            // Имя / ник
            let name = user.username ? `@${user.username}` : `${user.first_name} ${user.last_name || ""}`.trim();
            if (!name) name = "Telegram User";

            document.getElementById("displayName").textContent = name;
            document.getElementById("telegramInfo").textContent = `ID: ${user.id} • ${user.is_premium ? "Premium" : ""}`;

            // Загружаем сохранённую trade-ссылку (ключ уникальный для каждого tg id)
            const savedLink = localStorage.getItem(`steam_trade_${user.id}`);
            if (savedLink) {
                document.getElementById("tradeLink").value = savedLink;
                document.getElementById("message").textContent = "Ссылка уже сохранена";
                document.getElementById("message").style.color = "#a3d5ff";
            }
        } else {
            document.getElementById("displayName").textContent = "Не удалось получить данные пользователя";
            document.getElementById("message").textContent = "Запустите через Telegram → Mini App";
            document.getElementById("message").style.color = "#ff6b6b";
        }
    } else {
        // не в Telegram
        document.getElementById("displayName").textContent = "Это Telegram Mini App";
        document.getElementById("avatar").src = "https://via.placeholder.com/120?text=WebApp";
        document.getElementById("message").textContent = "Откройте через бота в Telegram";
        document.getElementById("message").style.color = "#ffcc00";
    }

    // Сохранение trade link
    document.getElementById("saveBtn").addEventListener("click", () => {
        const link = document.getElementById("tradeLink").value.trim();
        const msgEl = document.getElementById("message");

        if (!link) {
            msgEl.textContent = "Введите ссылку";
            msgEl.style.color = "#ff6b6b";
            return;
        }

        if (!link.includes("steamcommunity.com/tradeoffer/new/")) {
            msgEl.textContent = "Это не похоже на Steam Trade ссылку";
            msgEl.style.color = "#ffcc00";
            return;
        }

        if (user?.id) {
            localStorage.setItem(`steam_trade_${user.id}`, link);
            msgEl.textContent = "Ссылка сохранена!";
            msgEl.style.color = "#4caf50";
        } else {
            msgEl.textContent = "Сохранение недоступно вне Telegram";
            msgEl.style.color = "#ff6b6b";
        }
    });
});