// register.js

document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp || {};
    const debug = document.getElementById('debugInfo');

    function log(txt) {
        if (debug) {
            debug.innerHTML += txt + '<br>';
            debug.scrollTop = debug.scrollHeight;
        }
        console.log(txt);
    }

    log('Скрипт запущен');

    if (!tg || !tg.ready) {
        log('ОШИБКА: Telegram.WebApp не найден');
        fillProfileFallback();
        return;
    }

    // Обязательно вызываем ready
    tg.ready();
    tg.expand();

    log('Версия: ' + (tg.version || 'неизвестно'));
    log('Платформа: ' + (tg.platform || 'неизвестно'));

    function fillProfile() {
        const user = tg.initDataUnsafe?.user || null;

        if (user && user.id) {
            log('USER НАЙДЕН! ID: ' + user.id);

            // Фото
            document.getElementById('userPhoto').src = 
                user.photo_url || `https://via.placeholder.com/80?text=${encodeURIComponent(user.first_name?.[0] || '?')}`;

            // Имя
            const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Без имени';
            document.getElementById('userName').textContent = fullName;

            // Username
            document.getElementById('userUsername').textContent = 
                user.username ? '@' + user.username : 'нет никнейма';

            // ID
            document.getElementById('userId').textContent = 'ID: ' + user.id;

            // Убираем оранжевый цвет, если был
            document.getElementById('userName').style.color = '';
        } else {
            log('user отсутствует или пустой');
            fillProfileFallback();
        }

        // Показываем полный initDataUnsafe для отладки
        if (tg.initDataUnsafe) {
            log('initDataUnsafe:');
            log(JSON.stringify(tg.initDataUnsafe, null, 2));
        } else {
            log('initDataUnsafe: undefined');
        }
    }

    function fillProfileFallback() {
        // Показываем гостя, если ничего не пришло
        document.getElementById('userPhoto').src = 'https://via.placeholder.com/80?text=G';
        document.getElementById('userName').textContent = 'Гость';
        document.getElementById('userUsername').textContent = 'не авторизован';
        document.getElementById('userId').textContent = 'ID: скрыт';
        document.getElementById('userName').style.color = '#888';
    }

    // Пробуем заполнить сразу
    fillProfile();

    // Ждём события ready (на случай задержки)
    tg.onEvent('ready', () => {
        log('Событие ready сработало');
        fillProfile();
    });

    // Запасные попытки (на слабых устройствах / iOS бывает задержка)
    setTimeout(fillProfile, 400);
    setTimeout(fillProfile, 1200);
    setTimeout(fillProfile, 2500);
});
