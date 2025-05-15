// API endpoints
import { API_URL } from '../../../js/api-url.js'
import { getAuthHeaders, verify } from '../../js/verify-token.js'

// DOM elementlarini olish
const cafeTableBody = document.getElementById("cafeTableBody");
const tableLoader = document.getElementById("tableLoader");
const addCafeForm = document.getElementById("cafeForm");
const editCafeForm = document.getElementById("cafeForm");
const addCafeModal = document.getElementById("addCafeModal");
const editCafeModal = document.getElementById("editCafeModal");
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const cafeIdInput = document.getElementById("cafeId");
const cafeNameInput = document.getElementById("cafeName");
const cafeOwnerNameInput = document.getElementById("cafeAddress");
const cafePhoneInput = document.getElementById("cafePhone");
const cafeEmailInput = document.getElementById("cafeEmail");
const cafeTariffSelect = document.getElementById("cafeTariff");

// Loader funksiyalari
function showLoader() {
    tableLoader.style.display = 'table-row';
    cafeTableBody.innerHTML = '';
    cafeTableBody.appendChild(tableLoader);
}

function hideLoader() {
    tableLoader.style.display = 'none';
}

// Kafelar ro'yxatini yuklash
async function loadCafes() {
    showLoader();
    try {
        const response = await fetch(`${API_URL}/api/crud/all-kafes`);
        if (!response.ok) throw new Error('Kafelar yuklanmadi');
        const data = await response.json();
        updateCafesTable(data);
    } catch (error) {
        console.error('Xatolik:', error);
        showErrorMessage('Kafelar yuklanmadi');
    }
}

// Tariflar ro'yxatini yuklash
async function loadTariffs() {
    showLoader();
    try {
        const response = await fetch(`${API_URL}/api/tariffs/get-all`);
        if (!response.ok) throw new Error('Tariflar yuklanmadi');
        const data = await response.json();
        populateTariffSelect(data);
    } catch (error) {
        console.error('Xatolik:', error);
        showErrorMessage('Tariflar yuklanmadi');
    } finally {
        hideLoader();
    }
}

// Tariflar ro'yxatini select elementiga to'ldirish
function populateTariffSelect(tariffs) {
    const addTariffSelect = document.getElementById("addCafeTariff");
    const editTariffSelect = document.getElementById("editCafeTariff");
    
    const options = '<option value="">Tarifni tanlang</option>' + 
        tariffs.map(tariff => `<option value="${tariff.id}">${tariff.name}</option>`).join('');
    
    addTariffSelect.innerHTML = options;
    editTariffSelect.innerHTML = options;
}

// Kafelar jadvalini yangilash
function updateCafesTable(cafes) {
    hideLoader();
    cafeTableBody.innerHTML = "";

    cafes.forEach((cafe, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${cafe.name}</td>
            <td>${cafe.tariff?.name || 'Belgilanmagan'}</td>
            <td>${cafe.owner.firstName} ${cafe.owner.lastName}</td>
            <td>${cafe.owner.phone}</td>
            <td>${cafe.owner.email}</td>
            <td>${new Date(cafe.createdAt).toLocaleDateString()}</td>
            <td class="d-none">
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
        btn.addEventListener("click", () => editCafe(btn.dataset.id));
    });

    // Delete tugmalariga hodisa qo'shish
    document.querySelectorAll(".delete-cafe-btn").forEach((btn) => {
        btn.addEventListener("click", () => showDeleteCafeConfirmation(btn.dataset.id));
    });
}

// Kafeni tahrirlash
async function editCafe(id) {
    showLoader();
    try {
        const response = await fetch(`${API_URL}/api/crud/kafes/${id}`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Kafe ma\'lumotlari yuklanmadi');
        const cafe = await response.json();

        document.getElementById("editCafeId").value = cafe.id;
        document.getElementById("editCafeName").value = cafe.name;
        document.getElementById("editCafeTariff").value = cafe.tariffId || "";
        document.getElementById("editCafeAddress").value = cafe.ownerName;
        document.getElementById("editCafeEmail").value = cafe.email;
        document.getElementById("editCafePhone").value = cafe.phone;

        const modal = new bootstrap.Modal(editCafeModal);
        modal.show();
    } catch (error) {
        console.error('Xatolik:', error);
        showErrorMessage('Kafe ma\'lumotlari yuklanmadi');
    } finally {
        hideLoader();
    }
}

// Kafeni o'chirish tasdiqlash modalni ko'rsatish
function showDeleteCafeConfirmation(id) {
    const cafeName = document.querySelector(`[data-id="${id}"]`).closest('tr').querySelector('td:nth-child(2)').textContent;
    
    document.getElementById("deleteModalTitle").textContent = "Kafeni o'chirish";
    document.getElementById("deleteConfirmText").textContent = `Siz rostdan ham "${cafeName}" kafesini o'chirmoqchimisiz?`;
    document.getElementById("confirmDeleteBtn").dataset.id = id;

    const modal = new bootstrap.Modal(deleteConfirmModal);
    modal.show();
}

// Yangi kafe qo'shish
async function addCafe(event) {
    event.preventDefault();
    showLoader();
    
    const cafeData = {
        name: document.getElementById("addCafeName").value,
        tariffId: document.getElementById("addCafeTariff").value,
        ownerName: document.getElementById("addCafeAddress").value,
        email: document.getElementById("addCafeEmail").value,
        phone: document.getElementById("addCafePhone").value
    };

    try {
        const response = await fetch(`${API_URL}/api/crud/kafes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(cafeData)
        });

        if (!response.ok) throw new Error('Kafe qo\'shilmadi');

        const modal = bootstrap.Modal.getInstance(addCafeModal);
        modal.hide();
        showSuccessMessage("Kafe muvaffaqiyatli qo'shildi");
        loadCafes();
    } catch (error) {
        console.error('Xatolik:', error);
        showErrorMessage('Kafe qo\'shilmadi');
    } finally {
        hideLoader();
    }
}

// Kafeni yangilash
async function updateCafe(event) {
    event.preventDefault();
    showLoader();
    
    const id = document.getElementById("editCafeId").value;
    const cafeData = {
        name: document.getElementById("editCafeName").value,
        tariffId: document.getElementById("editCafeTariff").value,
        ownerName: document.getElementById("editCafeAddress").value,
        email: document.getElementById("editCafeEmail").value,
        phone: document.getElementById("editCafePhone").value
    };

    try {
        const response = await fetch(`${API_URL}/api/crud/kafes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(cafeData)
        });

        if (!response.ok) throw new Error('Kafe yangilanmadi');

        const modal = bootstrap.Modal.getInstance(editCafeModal);
        modal.hide();
        showSuccessMessage("Kafe muvaffaqiyatli yangilandi");
        loadCafes();
    } catch (error) {
        console.error('Xatolik:', error);
        showErrorMessage('Kafe yangilanmadi');
    } finally {
        hideLoader();
    }
}

// Kafeni o'chirish
async function deleteCafe(id) {
    showLoader();
    try {
        const response = await fetch(`${API_URL}/api/crud/kafes/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) throw new Error('Kafe o\'chirilmadi');

        const modal = bootstrap.Modal.getInstance(deleteConfirmModal);
        modal.hide();
        showSuccessMessage("Kafe muvaffaqiyatli o'chirildi");
        loadCafes();
    } catch (error) {
        console.error('Xatolik:', error);
        showErrorMessage('Kafe o\'chirilmadi');
    } finally {
        hideLoader();
    }
}

// Sahifa yuklanganda
document.addEventListener("DOMContentLoaded", async () => {
    await verify()
    loadCafes();
    loadTariffs();

    // Form submit hodisalari
    document.getElementById("addCafeBtn").addEventListener("click", addCafe);
    document.getElementById("updateCafeBtn").addEventListener("click", updateCafe);
    
    // O'chirish tasdiqlash
    document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
        const id = document.getElementById("confirmDeleteBtn").dataset.id;
        deleteCafe(id);
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