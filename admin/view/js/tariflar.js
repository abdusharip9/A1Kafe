
// Tarif ma'lumotlarini saqlash uchun massiv
let tariffs = [
    {
        id: 1,
        name: "Standart",
        durationType: "month",
        durationCount: 1,
        price: 50000,
        features: ["5 GB saqlash hajmi", "10 foydalanuvchi", "Asosiy funksiyalar"],
    },
    {
        id: 2,
        name: "Premium",
        durationType: "month",
        durationCount: 3,
        price: 120000,
        features: ["20 GB saqlash hajmi", "Cheksiz foydalanuvchilar", "Barcha funksiyalar", "24/7 qo'llab-quvvatlash"],
    },
    {
        id: 3,
        name: "Enterprise",
        durationType: "year",
        durationCount: 1,
        price: 500000,
        features: [
            "100 GB saqlash hajmi",
            "Cheksiz foydalanuvchilar",
            "Barcha funksiyalar",
            "24/7 qo'llab-quvvatlash",
            "Maxsus funksiyalar",
        ],
    },
];

// Funksiyalar ma'lumotlarini saqlash uchun massiv
let features = [
  {
    id: 1,
    name: "5 GB saqlash hajmi",
    description: "Fayllar va ma'lumotlar uchun 5 GB saqlash hajmi",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "10 GB saqlash hajmi",
    description: "Fayllar va ma'lumotlar uchun 10 GB saqlash hajmi",
    createdAt: "2023-01-15",
  },
  {
    id: 3,
    name: "20 GB saqlash hajmi",
    description: "Fayllar va ma'lumotlar uchun 20 GB saqlash hajmi",
    createdAt: "2023-01-15",
  },
  {
    id: 4,
    name: "50 GB saqlash hajmi",
    description: "Fayllar va ma'lumotlar uchun 50 GB saqlash hajmi",
    createdAt: "2023-01-15",
  },
  {
    id: 5,
    name: "100 GB saqlash hajmi",
    description: "Fayllar va ma'lumotlar uchun 100 GB saqlash hajmi",
    createdAt: "2023-01-15",
  },
  {
    id: 6,
    name: "10 foydalanuvchi",
    description: "Tizimda 10 ta foydalanuvchi yaratish imkoniyati",
    createdAt: "2023-01-20",
  },
  {
    id: 7,
    name: "50 foydalanuvchi",
    description: "Tizimda 50 ta foydalanuvchi yaratish imkoniyati",
    createdAt: "2023-01-20",
  },
  {
    id: 8,
    name: "100 foydalanuvchi",
    description: "Tizimda 100 ta foydalanuvchi yaratish imkoniyati",
    createdAt: "2023-01-20",
  },
  {
    id: 9,
    name: "Cheksiz foydalanuvchilar",
    description: "Tizimda cheksiz miqdorda foydalanuvchi yaratish imkoniyati",
    createdAt: "2023-01-20",
  },
  {
    id: 10,
    name: "Asosiy funksiyalar",
    description: "Tizimning asosiy funksiyalaridan foydalanish imkoniyati",
    createdAt: "2023-02-01",
  },
  {
    id: 11,
    name: "Barcha funksiyalar",
    description: "Tizimning barcha funksiyalaridan foydalanish imkoniyati",
    createdAt: "2023-02-01",
  },
  {
    id: 12,
    name: "24/7 qo'llab-quvvatlash",
    description: "Kunning istalgan vaqtida texnik yordam olish imkoniyati",
    createdAt: "2023-02-10",
  },
  {
    id: 13,
    name: "Maxsus funksiyalar",
    description: "Faqat premium mijozlar uchun maxsus funksiyalar",
    createdAt: "2023-02-15",
  },
  {
    id: 14,
    name: "Statistika va hisobotlar",
    description: "Keng qamrovli statistika va hisobotlarni ko'rish imkoniyati",
    createdAt: "2023-03-01",
  },
  {
    id: 15,
    name: "API integratsiyasi",
    description: "Tashqi tizimlar bilan integratsiya qilish uchun API",
    createdAt: "2023-03-10",
  },
  {
    id: 16,
    name: "Mobil ilova",
    description: "Android va iOS uchun mobil ilovadan foydalanish",
    createdAt: "2023-03-20",
  },
  {
    id: 17,
    name: "Eksport qilish imkoniyati",
    description: "Ma'lumotlarni CSV, Excel va PDF formatlarida eksport qilish",
    createdAt: "2023-04-01",
  },
  {
    id: 18,
    name: "Kengaytirilgan xavfsizlik",
    description: "Ikki bosqichli autentifikatsiya va boshqa xavfsizlik funksiyalari",
    createdAt: "2023-04-10",
  },
]

// Kafelar ma'lumotlarini saqlash uchun massiv
let cafes = [
    {
      id: 1,
      name: "Cafe Central",
      tariffId: 1,
      ownerName: "Alisher Karimov",
      email: "alisher@example.com",
      phone: "+998 90 123 45 67",
      createdAt: "2023-05-15",
    },
    {
      id: 2,
      name: "Coffee House",
      tariffId: 2,
      ownerName: "Dilshod Rahimov",
      email: "dilshod@example.com",
      phone: "+998 91 234 56 78",
      createdAt: "2023-06-20",
    },
    {
      id: 3,
      name: "Milliy Taomlar",
      tariffId: 3,
      ownerName: "Nodira Azizova",
      email: "nodira@example.com",
      phone: "+998 99 876 54 32",
      createdAt: "2023-07-10",
    },
  ]


// DOM elementlarini olish
const tariffTableBody = document.getElementById("tariffTableBody");
const tariffForm = document.getElementById("tariffForm");
const modalTitle = document.getElementById("modalTitle");
const tariffIdInput = document.getElementById("tariffId");
const tariffNameInput = document.getElementById("tariffName");
const tariffPriceInput = document.getElementById("tariffPrice");
const durationTypeSelect = document.getElementById("durationType");
const durationCountInput = document.getElementById("durationCount");
const featuresListElement = document.getElementById("featuresList");

// Tariflar jadvalini yangilash
function updateTariffsTable() {
    tariffTableBody.innerHTML = "";

    tariffs.forEach((tariff) => {
        const row = document.createElement("tr");

        // Muddat turini o'zbekcha ko'rinishda olish
        let durationTypeText = "";
        switch (tariff.durationType) {
            case "day":
                durationTypeText = "Kun";
                break;
            case "month":
                durationTypeText = "Oy";
                break;
            case "year":
                durationTypeText = "Yil";
                break;
        }

        row.innerHTML = `
            <td>${tariff.id}</td>
            <td>${tariff.name}</td>
            <td>${durationTypeText}</td>
            <td>${tariff.durationCount}</td>
            <td>${tariff.price.toLocaleString()} so'm</td>
            <td>${tariff.features.length}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action edit-tariff-btn" data-id="${tariff.id}">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-action delete-tariff-btn" data-id="${tariff.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        tariffTableBody.appendChild(row);
    });

    // Edit tugmalariga hodisa qo'shish
    document.querySelectorAll(".edit-tariff-btn").forEach((btn) => {
        btn.addEventListener("click", () => editTariff(Number.parseInt(btn.dataset.id)));
    });

    // Delete tugmalariga hodisa qo'shish
    document.querySelectorAll(".delete-tariff-btn").forEach((btn) => {
        btn.addEventListener("click", () => showDeleteTariffConfirmation(Number.parseInt(btn.dataset.id)));
    });
}

// Funksiyalar ro'yxatini checkbox sifatida ko'rsatish
function renderFeaturesCheckboxes(selectedFeatures = []) {
    featuresListElement.innerHTML = "";

    features.forEach((feature) => {
        const isChecked = selectedFeatures.includes(feature.name);

        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
            <div class="form-check">
                <input class="form-check-input feature-checkbox" type="checkbox" value="${feature.name}" id="feature${feature.id}" ${isChecked ? "checked" : ""}>
                <label class="form-check-label" for="feature${feature.id}">
                    ${feature.name}
                    ${feature.description ? `<small class="d-block text-muted">${feature.description}</small>` : ""}
                </label>
            </div>
        `;

        featuresListElement.appendChild(li);
    });

    if (features.length === 0) {
        featuresListElement.innerHTML = `
            <li class="list-group-item text-center text-muted">
                Funksiyalar mavjud emas. Avval funksiyalar qo'shing.
            </li>
        `;
    }
}

// Tanlangan funksiyalarni olish
function getSelectedFeatures() {
    const selectedFeatures = [];
    document.querySelectorAll(".feature-checkbox:checked").forEach((checkbox) => {
        selectedFeatures.push(checkbox.value);
    });
    return selectedFeatures;
}

// Tarifni tahrirlash
function editTariff(id) {
    const tariff = tariffs.find((t) => t.id === id);
    if (!tariff) return;

    modalTitle.textContent = "Tarifni tahrirlash";
    tariffIdInput.value = tariff.id;
    tariffNameInput.value = tariff.name;
    tariffPriceInput.value = tariff.price;
    durationTypeSelect.value = tariff.durationType;
    durationCountInput.value = tariff.durationCount;

    // Funksiyalarni belgilash
    renderFeaturesCheckboxes(tariff.features);

    // Modalni ochish
    const modalElement = document.getElementById("addTariffModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Tarifni o'chirish tasdiqlash modalni ko'rsatish
function showDeleteTariffConfirmation(id) {
    const tariff = tariffs.find((t) => t.id === id);
    if (!tariff) return;

    // Tarif kafelar tomonidan ishlatilayotganligini tekshirish
    const isUsed = cafes.some((cafe) => cafe.tariffId === id);

    deleteModalTitle.textContent = "Tarifni o'chirish";
    deleteConfirmText.textContent = `Siz rostdan ham "${tariff.name}" tarifini o'chirmoqchimisiz?`;

    if (isUsed) {
        deleteFeatureWarning.style.display = "block";
        deleteFeatureWarning.innerHTML = `
            <i class="bi bi-exclamation-triangle me-2"></i>
            <span>Diqqat! Bu tarif ba'zi kafelar tomonidan ishlatilmoqda. O'chirilsa, ularning tarifi "Belgilanmagan" bo'ladi.</span>
        `;
    } else {
        deleteFeatureWarning.style.display = "none";
    }

    // O'chirish turi va ID ni saqlash
    confirmDeleteBtn.dataset.type = "tariff";
    confirmDeleteBtn.dataset.id = id;

    // Modalni ochish
    const modalElement = document.getElementById("deleteConfirmModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Yangi tarif qo'shish modalni ochish
document.querySelector('[data-bs-target="#addTariffModal"]').addEventListener("click", () => {
    modalTitle.textContent = "Yangi tarif qo'shish";
    tariffForm.reset();
    tariffIdInput.value = "";

    // Barcha funksiyalarni belgilanmagan holatda ko'rsatish
    renderFeaturesCheckboxes([]);
});

// Sahifa yuklanganda
document.addEventListener("DOMContentLoaded", () => {
    // Jadvallarni yangilash
    updateTariffsTable();

    // Saqlash tugmasi uchun hodisa qo'shish
    document.getElementById("saveTariffBtn").addEventListener("click", () => {
        const form = document.getElementById("tariffForm");
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const tariffId = Number.parseInt(tariffIdInput.value);
        const tariffData = {
            id: tariffId || tariffs.length + 1,
            name: tariffNameInput.value,
            durationType: durationTypeSelect.value,
            durationCount: Number.parseInt(durationCountInput.value),
            price: Number.parseInt(tariffPriceInput.value),
            features: getSelectedFeatures(),
        };

        if (tariffId) {
            // Tahrirlash
            const index = tariffs.findIndex((t) => t.id === tariffId);
            if (index !== -1) {
                tariffs[index] = { ...tariffs[index], ...tariffData };
            }
        } else {
            // Yangi qo'shish
            tariffs.push(tariffData);
        }

        // Jadvallarni yangilash
        updateTariffsTable();

        // Modalni yopish
        const modalElement = document.getElementById("addTariffModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Muvaffaqiyatli xabar ko'rsatish
        showSuccessMessage("Tarif muvaffaqiyatli saqlandi");
    });

    // O'chirish tasdiqlash tugmasi uchun hodisa qo'shish
    document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
        const type = confirmDeleteBtn.dataset.type;
        const id = Number.parseInt(confirmDeleteBtn.dataset.id);

        if (type === "tariff") {
            // Tarifni o'chirish
            const index = tariffs.findIndex((t) => t.id === id);
            if (index !== -1) {
                tariffs.splice(index, 1);
                updateTariffsTable();
                showSuccessMessage("Tarif muvaffaqiyatli o'chirildi");
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


import { API_URL } from '../../../js/api-url.js'

const response = await fetch(`${API_URL}/api/tariffs/get-all`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})

const tariflar = await response.json()

console.log(tariflar)
