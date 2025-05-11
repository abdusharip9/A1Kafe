// DOM elementlarini olish
const profileForm = document.getElementById("personalInfoForm");
const securityForm = document.getElementById("changePasswordForm");
const savePersonalInfoBtn = document.getElementById("savePersonalInfoBtn");
const changePasswordBtn = document.getElementById("changePasswordBtn");

// Profil ma'lumotlarini saqlash
let profile = {
    fullName: "Admin Adminov",
    email: "admin@example.com",
    phone: "+998 90 123 45 67",
};

// Profil ma'lumotlarini yangilash
function updateProfile() {
    const fullNameInput = document.getElementById("settingsName");
    const emailInput = document.getElementById("settingsLogin");

    fullNameInput.value = profile.fullName;
    emailInput.value = profile.email;
}

// Tizim sozlamalarini yangilash
function updateSettings() {
    const themeInputs = document.querySelectorAll('input[name="themeMode"]');
    themeInputs.forEach(input => {
        if (input.value === settings.theme) {
            input.checked = true;
        }
    });
}

// Parol ko'rsatish/yashirish
function togglePasswordVisibility(button) {
    const targetId = button.dataset.target;
    const input = document.getElementById(targetId);
    const icon = button.querySelector('i');

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
}

// Shaxsiy ma'lumotlarni saqlash
savePersonalInfoBtn.addEventListener("click", () => {
    const fullNameInput = document.getElementById("settingsName");
    const emailInput = document.getElementById("settingsLogin");

    if (!fullNameInput.value || !emailInput.value) {
        showErrorMessage("Barcha maydonlarni to'ldiring");
        return;
    }

    profile.fullName = fullNameInput.value;
    profile.email = emailInput.value;

    // Foydalanuvchi ma'lumotlarini yangilash
    document.getElementById("currentUserName").textContent = profile.fullName;
    document.getElementById("userInitials").textContent = profile.fullName.split(' ').map(n => n[0]).join('');

    showSuccessMessage("Profil ma'lumotlari muvaffaqiyatli saqlandi");
});

// Parolni o'zgartirish
changePasswordBtn.addEventListener("click", () => {
    const currentPasswordInput = document.getElementById("currentPassword");
    const newPasswordInput = document.getElementById("newPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    if (!currentPasswordInput.value || !newPasswordInput.value || !confirmPasswordInput.value) {
        showErrorMessage("Barcha maydonlarni to'ldiring");
        return;
    }

    // Parolni tekshirish
    if (newPasswordInput.value !== confirmPasswordInput.value) {
        showErrorMessage("Yangi parol va tasdiqlash paroli mos kelmadi");
        return;
    }

    // Parol uzunligini tekshirish
    if (newPasswordInput.value.length < 6) {
        showErrorMessage("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
        return;
    }

    showSuccessMessage("Parol muvaffaqiyatli o'zgartirildi");

    // Formani tozalash
    securityForm.reset();
});


// Parol ko'rsatish/yashirish tugmalari uchun hodisa qo'shish
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => togglePasswordVisibility(button));
});


// Muvaffaqiyatli xabar ko'rsatish
function showSuccessMessage(message) {
    const toast = document.getElementById("successToast");
    const toastMessage = document.getElementById("successToastMessage");
    toastMessage.textContent = message;
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

// Xatolik xabarini ko'rsatish
function showErrorMessage(message) {
    const toast = document.getElementById("errorToast");
    const toastMessage = document.getElementById("errorToastMessage");
    toastMessage.textContent = message;
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

// Sahifa yuklanganda
document.addEventListener("DOMContentLoaded", () => {
    // Profil ma'lumotlarini yangilash
    updateProfile();
    
    // Tizim sozlamalarini yangilash
    updateSettings();
}); 