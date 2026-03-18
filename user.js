let user = JSON.parse(localStorage.getItem("user"));

if(user){
    document.getElementById("usernameDisplay").innerText = user.username;
}
// в конец user.js
const tg = window.Telegram?.WebApp;
if (tg && tg.initDataUnsafe?.user) {
    const u = tg.initDataUnsafe.user;
    let name = u.username ? `@${u.username}` : u.first_name;
    document.getElementById("usernameDisplay").innerText = name || "Гость";
}