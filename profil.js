// Инициализация Web App
const tg = window.Telegram.WebApp;
tg.ready(); // Сообщаем, что приложение готово

// Получение данных пользователя
const user = tg.initDataUnsafe.user;

if (user) {
    const userId = user.id; // Telegram ID
    const firstName = user.first_name; // Имя
    const lastName = user.last_name || ''; // Фамилия (если есть)
    const username = user.username || ''; // Юзернейм (если есть)
    const photoUrl = user.photo_url || ''; // Ссылка на аватарку

    // Вывод данных на страницу
    console.log(user);
    document.getElementById('user-id').innerText = userId;
    document.getElementById('user-name').innerText = `${firstName} ${lastName}`;
    if (photoUrl) {
        document.getElementById('user-avatar').src = photoUrl;
    }
} else {
    console.log("Данные пользователя не найдены. Вы запустили Web App не через Telegram?");
}

});
