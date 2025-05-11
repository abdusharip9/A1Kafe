// Tariflar ma'lumotlarini saqlash uchun massiv
let tariffs = [];

// Kafelar ma'lumotlarini saqlash uchun massiv
let cafes = [
    {
        id: 1,
        name: "Kafe 1",
        ownerName: "Alisher Karimov",
        phone: "+998 90 123 45 67",
        email: "kafe1@example.com",
        tariffId: 1,
        createdAt: "2024-02-20",
    },
    {
        id: 2,
        name: "Kafe 2",
        ownerName: "Dilshod Rahimov",
        phone: "+998 90 123 45 68",
        email: "kafe2@example.com",
        tariffId: 2,
        createdAt: "2024-02-20",
    },
    {
        id: 3,
        name: "Kafe 3",
        ownerName: "Nodira Azizova",
        phone: "+998 90 123 45 69",
        email: "kafe3@example.com",
        tariffId: 3,
        createdAt: "2024-02-20",
    },
];

// DOM elementlarini olish
const cafeTableBody = document.getElementById("cafeTableBody");
const cafeForm = document.getElementById("cafeForm");
const modalTitle = document.getElementById("cafeModalTitle");
const cafeIdInput = document.getElementById("cafeId");
const cafeNameInput = document.getElementById("cafeName");
const cafeOwnerNameInput = document.getElementById("cafeAddress");
const cafePhoneInput = document.getElementById("cafePhone");
const cafeEmailInput = document.getElementById("cafeEmail");
const cafeTariffSelect = document.getElementById("cafeTariff");

// Tariflar ro'yxatini select elementiga to'ldirish
function populateTariffSelect() {
    cafeTariffSelect.innerHTML = '<option value="">Tarifni tanlang</option>';

    tariffs.forEach((tariff) => {
        const option = document.createElement("option");
        option.value = tariff.id;
        option.textContent = tariff.name;
        cafeTariffSelect.appendChild(option);
    });
}

// Kafelar jadvalini yangilash
function updateCafesTable() {
    cafeTableBody.innerHTML = "";

    cafes.forEach((cafe) => {
        const row = document.createElement("tr");

        // Tarif nomini olish
        const tariff = tariffs.find((t) => t.id === cafe.tariffId);
        const tariffName = tariff ? tariff.name : "Belgilanmagan";

        row.innerHTML = `
            <td>${cafe.id}</td>
            <td>${cafe.name}</td>
            <td>${tariffName}</td>
            <td>${cafe.ownerName}</td>
            <td>${cafe.email}</td>
            <td>${cafe.phone}</td>
            <td>${cafe.createdAt}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action edit-cafe-btn" data-id="${cafe.id}">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-action delete-cafe-btn" data-id="${cafe.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        cafeTableBody.appendChild(row);
    });

    // Edit tugmalariga hodisa qo'shish
    document.querySelectorAll(".edit-cafe-btn").forEach((btn) => {
        btn.addEventListener("click", () => editCafe(Number.parseInt(btn.dataset.id)));
    });

    // Delete tugmalariga hodisa qo'shish
    document.querySelectorAll(".delete-cafe-btn").forEach((btn) => {
        btn.addEventListener("click", () => showDeleteCafeConfirmation(Number.parseInt(btn.dataset.id)));
    });
}

// Kafeni tahrirlash
function editCafe(id) {
    const cafe = cafes.find((c) => c.id === id);
    if (!cafe) return;

    modalTitle.textContent = "Kafeni tahrirlash";
    cafeIdInput.value = cafe.id;
    cafeNameInput.value = cafe.name;
    cafeOwnerNameInput.value = cafe.ownerName;
    cafePhoneInput.value = cafe.phone;
    cafeEmailInput.value = cafe.email;
    cafeTariffSelect.value = cafe.tariffId || "";

    // Modalni ochish
    const modalElement = document.getElementById("addCafeModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Kafeni o'chirish tasdiqlash modalni ko'rsatish
function showDeleteCafeConfirmation(id) {
    const cafe = cafes.find((c) => c.id === id);
    if (!cafe) return;

    deleteModalTitle.textContent = "Kafeni o'chirish";
    deleteConfirmText.textContent = `Siz rostdan ham "${cafe.name}" kafesini o'chirmoqchimisiz?`;

    // O'chirish turi va ID ni saqlash
    confirmDeleteBtn.dataset.type = "cafe";
    confirmDeleteBtn.dataset.id = id;

    // Modalni ochish
    const modalElement = document.getElementById("deleteConfirmModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Yangi kafe qo'shish modalni ochish
document.querySelector('[data-bs-target="#addCafeModal"]').addEventListener("click", () => {
    modalTitle.textContent = "Yangi kafe qo'shish";
    cafeForm.reset();
    cafeIdInput.value = "";
});

// Sahifa yuklanganda
document.addEventListener("DOMContentLoaded", () => {
    // Tariflar ro'yxatini yuklash
    fetch('../data/tariffs.json')
        .then(response => response.json())
        .then(data => {
            tariffs = data;
            // Jadvallarni yangilash
            updateCafesTable();
            // Tariflar ro'yxatini to'ldirish
            populateTariffSelect();
        })
        .catch(error => {
            console.error('Tariflar yuklanmadi:', error);
            showErrorMessage('Tariflar yuklanmadi');
        });

    // Saqlash tugmasi uchun hodisa qo'shish
    document.getElementById("saveCafeBtn").addEventListener("click", () => {
        const form = document.getElementById("cafeForm");
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const cafeId = Number.parseInt(cafeIdInput.value);
        const cafeData = {
            id: cafeId || cafes.length + 1,
            name: cafeNameInput.value,
            ownerName: cafeOwnerNameInput.value,
            phone: cafePhoneInput.value,
            email: cafeEmailInput.value,
            tariffId: Number.parseInt(cafeTariffSelect.value),
            createdAt: cafeId ? cafes.find(c => c.id === cafeId).createdAt : new Date().toISOString().split('T')[0]
        };

        if (cafeId) {
            // Tahrirlash
            const index = cafes.findIndex((c) => c.id === cafeId);
            if (index !== -1) {
                cafes[index] = { ...cafes[index], ...cafeData };
            }
        } else {
            // Yangi qo'shish
            cafes.push(cafeData);
        }

        // Jadvallarni yangilash
        updateCafesTable();

        // Modalni yopish
        const modalElement = document.getElementById("addCafeModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Muvaffaqiyatli xabar ko'rsatish
        showSuccessMessage("Kafe muvaffaqiyatli saqlandi");
    });

    // O'chirish tasdiqlash tugmasi uchun hodisa qo'shish
    document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
        const type = confirmDeleteBtn.dataset.type;
        const id = Number.parseInt(confirmDeleteBtn.dataset.id);

        if (type === "cafe") {
            // Kafeni o'chirish
            const index = cafes.findIndex((c) => c.id === id);
            if (index !== -1) {
                cafes.splice(index, 1);
                updateCafesTable();
                showSuccessMessage("Kafe muvaffaqiyatli o'chirildi");
            }
        }

        // Modalni yopish
        const modalElement = document.getElementById("deleteConfirmModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    });
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