
import { API_URL } from '../../../js/api-url.js'

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
  ]
  

// DOM elementlarini olish
const featureTableBody = document.getElementById("featureTableBody");
const featureForm = document.getElementById("addFeatureForm");
const editFeatureForm = document.getElementById("editFeatureForm");
const updateFeatureBtn = document.getElementById("updateFeatureBtn");
const editFeatureModalLabel = document.getElementById("editFeatureModalLabel");
const addFeatureModalLabel = document.getElementById("addFeatureModalLabel");
const featureNameInput = document.getElementById("featureName");
const featureNameInputEdit = document.getElementById("featureNameEdit");
const featureDescriptionInput = document.getElementById("featureDescription");
const featureDescriptionInputEdit = document.getElementById("featureDescriptionEdit");
const featureCodeInput = document.getElementById("featureCode");
const featureCodeInputEdit = document.getElementById("featureCodeEdit");

// Funksiyalar jadvalini yangilash
function updateFeaturesTable(features) {
    featureTableBody.innerHTML = "";

    features.forEach((feature) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${feature._id}</td>
            <td>${feature.name}</td>
            <td>${feature.code || "-"}</td>
            <td>${feature.description || "-"}</td>
            <td>${feature.createdAt}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action edit-feature-btn" data-id="${feature._id}">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-action delete-feature-btn" data-id="${feature._id}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        featureTableBody.appendChild(row);
    });

    // Edit tugmalariga hodisa qo'shish
    document.querySelectorAll(".edit-feature-btn").forEach((btn) => {
        btn.addEventListener("click", () => editFeature(btn.dataset.id, features));
    });

    // Delete tugmalariga hodisa qo'shish
    document.querySelectorAll(".delete-feature-btn").forEach((btn) => {
        btn.addEventListener("click", () => showDeleteFeatureConfirmation(btn.dataset.id, features));
    });
}

// Funksiyani tahrirlash
// async function editFeature(id, features) {
//     const feature = features.find((f) => f._id === id);
//     if (!feature) return;

//     editFeatureModalLabel.textContent = "Funksiyani tahrirlash";
//     featureNameInputEdit.value = feature.name;
//     featureDescriptionInputEdit.value = feature.description || "";
//     featureCodeInputEdit.value = feature.code || "";

//     // Modalni ochish
//     const modalElement = document.getElementById("editFeatureModal");
//     const modal = new bootstrap.Modal(modalElement);
//     modal.show();

//     // Tahrirlash tugmasi uchun hodisa qo'shish
//     updateFeatureBtn.addEventListener("click", async () => {
//         const form = document.getElementById("editFeatureForm");
        
//         const response = await fetch(`${API_URL}/api/features/update/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: featureNameInputEdit.value,
//                 description: featureDescriptionInputEdit.value,
//                 code: featureCodeInputEdit.value,
//             }),
//             })
    
//         // Jadvallarni yangilash
//         updateFeaturesTable(features);

//         // Modalni yopish
//         const modalElement = document.getElementById("editFeatureModal");
//         const modal = bootstrap.Modal.getInstance(modalElement);
//         modal.hide();

//         // Muvaffaqiyatli xabar ko'rsatish
//         if(response.ok){
//             showSuccessMessage("Funksiya muvaffaqiyatli tahrirlandi");
//         }else{
//             showErrorMessage("Funksiya tahrirlanmadi");
//         }
//     });
// }

// Funksiyani o'chirish tasdiqlash modalni ko'rsatish
function showDeleteFeatureConfirmation(id, features) {
    const feature = features.find((f) => f._id === id);
    if (!feature) return;

    // Funksiya tariflar tomonidan ishlatilayotganligini tekshirish
    const isUsed = tariffs.some((tariff) => tariff.features.includes(feature.name));

    deleteModalTitle.textContent = "Funksiyani o'chirish";
    deleteConfirmText.textContent = `Siz rostdan ham "${feature.name}" funksiyasini o'chirmoqchimisiz?`;

    if (isUsed) {
        deleteFeatureWarning.style.display = "block";
        deleteFeatureWarning.innerHTML = `
            <i class="bi bi-exclamation-triangle me-2"></i>
            <span>Diqqat! Bu funksiya ba'zi tariflar tomonidan ishlatilmoqda. O'chirilsa, ularning funksiyalari ham o'chiriladi.</span>
        `;
    } else {
        deleteFeatureWarning.style.display = "none";
    }

    // O'chirish turi va ID ni saqlash
    confirmDeleteBtn.dataset.type = "feature";
    confirmDeleteBtn.dataset.id = id;

    // Modalni ochish
    const modalElement = document.getElementById("deleteConfirmModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Sahifa yuklanganda
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(`${API_URL}/api/features/get-all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    let features = await response.json()

    // Jadvallarni yangilash
    updateFeaturesTable(features);

    // Saqlash tugmasi uchun hodisa qo'shish

        const form = document.getElementById("addFeatureForm");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const response = await fetch(`${API_URL}/api/features/create`, {
                method: 'POST',
                headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    name: featureNameInput.value,
                    description: featureDescriptionInput.value,
                    code: featureCodeInput.value,
                }),
            })

            let feature = await response.json()

            // Jadvallarni yangilash
            updateFeaturesTable(feature);

            // Modalni yopish
            const modalElement = document.getElementById("addFeatureModal");
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();

            // Muvaffaqiyatli xabar ko'rsatish
            if(response.ok){
                showSuccessMessage("Funksiya muvaffaqiyatli saqlandi");
            }else{
                showErrorMessage("Funksiya saqlanmadi");
            }
    });

    // O'chirish tasdiqlash tugmasi uchun hodisa qo'shish
    document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
        const type = confirmDeleteBtn.dataset.type;
        const id = Number.parseInt(confirmDeleteBtn.dataset.id);

        if (type === "feature") {
            // Funksiyani o'chirish
            const index = features.findIndex((f) => f.id === id);
            if (index !== -1) {
                features.splice(index, 1);
                updateFeaturesTable();
                showSuccessMessage("Funksiya muvaffaqiyatli o'chirildi");
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

