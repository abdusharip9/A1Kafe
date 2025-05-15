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
