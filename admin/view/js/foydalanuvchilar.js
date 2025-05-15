import { API_URL } from '../../../js/api-url.js'
import { verify } from '../../js/verify-token.js'
document.addEventListener('DOMContentLoaded', async () => {
    const userData = await verify()
    console.log(userData)
})

// DOM elementlarini olish
const userTableBody = document.getElementById("userTableBody");
const userForm = document.getElementById("userForm");
const modalTitle = document.getElementById("userModalTitle");
const userIdInput = document.getElementById("userId");
const userFullNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userLogin");
const userRoleSelect = document.getElementById("userRole");
const userPermissionsList = document.getElementById("userPermissionsList");
const deleteModalTitle = document.getElementById("deleteModalTitle");
const deleteConfirmText = document.getElementById("deleteConfirmText");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

// Ro'llar ro'yxatini to'ldirish
function populateRoles() {
    const roles = [
        { value: "admin", label: "Tizim administratori" },
        { value: "manager", label: "Menejer" },
        { value: "user", label: "Foydalanuvchi" }
    ];

    userRoleSelect.innerHTML = '<option value="">Ro\'lni tanlang</option>';
    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.value;
        option.textContent = role.label;
        userRoleSelect.appendChild(option);
    });
}

// Foydalanuvchi xususiyatlarini to'ldirish
function populatePermissions() {
    const permissions = [
        { value: "view_tariffs", label: "Tariflarni ko'rish" },
        { value: "edit_tariffs", label: "Tariflarni tahrirlash" },
        { value: "view_features", label: "Funksiyalarni ko'rish" },
        { value: "edit_features", label: "Funksiyalarni tahrirlash" },
        { value: "view_cafes", label: "Kafelarni ko'rish" },
        { value: "edit_cafes", label: "Kafelarni tahrirlash" },
        { value: "view_users", label: "Foydalanuvchilarni ko'rish" },
        { value: "edit_users", label: "Foydalanuvchilarni tahrirlash" },
        { value: "view_roles", label: "Ro'llarni ko'rish" },
        { value: "edit_roles", label: "Ro'llarni tahrirlash" }
    ];

    userPermissionsList.innerHTML = '';
    permissions.forEach(permission => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        
        const div = document.createElement('div');
        div.className = 'form-check';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'form-check-input';
        input.id = `permission_${permission.value}`;
        input.value = permission.value;
        
        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = `permission_${permission.value}`;
        label.textContent = permission.label;
        
        div.appendChild(input);
        div.appendChild(label);
        li.appendChild(div);
        userPermissionsList.appendChild(li);
    });
}

// // Foydalanuvchilar jadvalini yangilash
// function updateUsersTable() {
//     userTableBody.innerHTML = "";

//     users.forEach((user) => {
//         const row = document.createElement("tr");

//         // Rol nomini o'zbekcha ko'rinishda olish
//         let roleText = "";
//         switch (user.role) {
//             case "admin":
//                 roleText = "Tizim administratori";
//                 break;
//             case "manager":
//                 roleText = "Menejer";
//                 break;
//             case "user":
//                 roleText = "Foydalanuvchi";
//                 break;
//         }

//         row.innerHTML = `
//             <td>${user.id}</td>
//             <td>${user.fullName}</td>
//             <td>${roleText}</td>
//             <td>${user.email}</td>
//             <td>••••••••</td>
//             <td>${user.permissions.length} ta</td>
//             <td>
//                 <button class="btn btn-sm btn-primary btn-action edit-user-btn" data-id="${user.id}">
//                     <i class="bi bi-pencil"></i>
//                 </button>
//                 <button class="btn btn-sm btn-danger btn-action delete-user-btn" data-id="${user.id}">
//                     <i class="bi bi-trash"></i>
//                 </button>
//             </td>
//         `;

//         userTableBody.appendChild(row);
//     });

//     // Edit tugmalariga hodisa qo'shish
//     document.querySelectorAll(".edit-user-btn").forEach((btn) => {
//         btn.addEventListener("click", () => editUser(Number.parseInt(btn.dataset.id)));
//     });

//     // Delete tugmalariga hodisa qo'shish
//     document.querySelectorAll(".delete-user-btn").forEach((btn) => {
//         btn.addEventListener("click", () => showDeleteUserConfirmation(Number.parseInt(btn.dataset.id)));
//     });
// }

// Foydalanuvchini tahrirlash
// function editUser(id) {
//     const user = users.find((u) => u.id === id);
//     if (!user) return;

//     modalTitle.textContent = "Foydalanuvchini tahrirlash";
//     userIdInput.value = user.id;
//     userFullNameInput.value = user.fullName;
//     userEmailInput.value = user.email;
//     userRoleSelect.value = user.role;

//     // Huquqlarni tanlash
//     const checkboxes = userPermissionsList.querySelectorAll('input[type="checkbox"]');
//     checkboxes.forEach(checkbox => {
//         checkbox.checked = user.permissions.includes(checkbox.value);
//     });

//     // Modalni ochish
//     const modalElement = document.getElementById("addUserModal");
//     const modal = new bootstrap.Modal(modalElement);
//     modal.show();
// }

// Foydalanuvchini o'chirish tasdiqlash modalni ko'rsatish
function showDeleteUserConfirmation(id) {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    deleteModalTitle.textContent = "Foydalanuvchini o'chirish";
    deleteConfirmText.textContent = `Siz rostdan ham "${user.fullName}" foydalanuvchisini o'chirmoqchimisiz?`;

    // O'chirish turi va ID ni saqlash
    confirmDeleteBtn.dataset.type = "user";
    confirmDeleteBtn.dataset.id = id;

    // Modalni ochish
    const modalElement = document.getElementById("deleteConfirmModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Sahifa yuklanganda
document.addEventListener("DOMContentLoaded", () => {
    // Ro'llar ro'yxatini to'ldirish
    populateRoles();
    
    // Foydalanuvchi xususiyatlarini to'ldirish
    populatePermissions();

    // // Yangi foydalanuvchi qo'shish modalni ochish
    // document.querySelector('[data-bs-target="#addUserModal"]').addEventListener("click", () => {
    //     modalTitle.textContent = "Yangi foydalanuvchi qo'shish";
    //     userForm.reset();
    //     userIdInput.value = "";
    //     userRoleSelect.value = ""; // Ro'l tanlashni tozalash

    //     // Huquqlarni tozalash
    //     const checkboxes = userPermissionsList.querySelectorAll('input[type="checkbox"]');
    //     checkboxes.forEach(checkbox => {
    //         checkbox.checked = false;
    //     });
    // });

    // Saqlash tugmasi uchun hodisa qo'shish
    document.getElementById("saveUserBtn").addEventListener("click", () => {
        const form = document.getElementById("userForm");
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Tanlangan huquqlarni olish
        const selectedPermissions = Array.from(userPermissionsList.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        const userId = Number.parseInt(userIdInput.value);
        const userData = {
            id: userId || users.length + 1,
            fullName: userFullNameInput.value,
            email: userEmailInput.value,
            role: userRoleSelect.value,
            createdAt: new Date().toISOString().split('T')[0],
            permissions: selectedPermissions
        };

        if (userId) {
            // Tahrirlash
            const index = users.findIndex((u) => u.id === userId);
            if (index !== -1) {
                users[index] = { ...users[index], ...userData };
            }
        } else {
            // Yangi qo'shish
            users.push(userData);
        }

        // Jadvallarni yangilash
        updateUsersTable();

        // Modalni yopish
        const modalElement = document.getElementById("addUserModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Muvaffaqiyatli xabar ko'rsatish
        showSuccessMessage("Foydalanuvchi muvaffaqiyatli saqlandi");
    });

    // O'chirish tasdiqlash tugmasi uchun hodisa qo'shish
    confirmDeleteBtn.addEventListener("click", () => {
        const id = Number.parseInt(confirmDeleteBtn.dataset.id);
        const type = confirmDeleteBtn.dataset.type;

        if (type === "user") {
            // Foydalanuvchini o'chirish
            users = users.filter(user => user.id !== id);
            updateUsersTable();
            showSuccessMessage("Foydalanuvchi muvaffaqiyatli o'chirildi");
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

// Show loading state in table - colspan ni 8 ga o'zgartirish
function showTableLoader() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = `
        <tr>
            <td colspan="8" class="text-center py-4">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border text-primary me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <span>Ma'lumotlar yuklanmoqda...</span>
                </div>
            </td>
        </tr>
    `;
}

// Fetch function da error state uchun ham colspan ni o'zgartirish
async function fetchUsers() {
    // Show loader first
    showTableLoader();
    
    try {
        const response = await fetch(`${API_URL}/api/crud/getUsers`);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        showError('Foydalanuvchilarni yuklashda xatolik yuz berdi!');
        
        // Show error state in table
        const tableBody = document.getElementById('userTableBody');
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-4 text-danger">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    Xatolik yuz berdi. Ma'lumotlarni yuklab bo'lmadi.
                </td>
            </tr>
        `;
    }
}

function displayUsers(users) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    // If no users found
    if (!users || users.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-4 text-muted">
                    <i class="bi bi-info-circle me-2"></i>
                    Hech qanday foydalanuvchi topilmadi.
                </td>
            </tr>
        `;
        return;
    }

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        
        // Handle multiple cafes
        const cafeNames = user.cafes && user.cafes.length > 0 ? 
            user.cafes.map(cafe => cafe.name).join(', ') : '-';
        
        const cafeStatuses = user.cafes && user.cafes.length > 0 ? 
            user.cafes.map(cafe => 
                `<span class="badge ${cafe.status === 'active' ? 'bg-success' : 'bg-danger'} me-1">${cafe.status === 'active' ? 'Faol' : 'Faol emas'}</span>`
            ).join('') : '-';

        // Handle tariff information
        const cafeTariffs = user.cafes && user.cafes.length > 0 ?
            user.cafes.map(cafe => 
                cafe.tariff ? 
                    `<span class="badge bg-info text-dark me-1">${cafe.tariff.name}</span>` : 
                    '<span class="badge bg-secondary me-1">Tanlanmagan</span>'
            ).join('') : '-';

        // Amallar ustunini olib tashlash
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td><span class="badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}">${user.role}</span></td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${cafeNames}</td>
            <td>${cafeStatuses}</td>
            <td>${cafeTariffs}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Show success message
function showSuccess(message) {
    const successToast = document.getElementById('successToast');
    const successToastMessage = document.getElementById('successToastMessage');
    successToastMessage.textContent = message;
    const bsSuccessToast = new bootstrap.Toast(successToast);
    bsSuccessToast.show();
}

// Show error message
function showError(message) {
    const errorToast = document.getElementById('errorToast');
    const errorToastMessage = document.getElementById('errorToastMessage');
    errorToastMessage.textContent = message;
    const bsErrorToast = new bootstrap.Toast(errorToast);
    bsErrorToast.show();
}

// Edit user function
function editUser(userId) {
    // TODO: Implement edit functionality
    console.log('Edit user:', userId);
}

// Delete user function
function deleteUser(userId) {
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const deleteConfirmText = document.getElementById('deleteConfirmText');
    
    deleteConfirmText.textContent = 'Siz rostdan ham bu foydalanuvchini o\'chirmoqchimisiz?';
    
    confirmDeleteBtn.onclick = async () => {
        try {
            // TODO: Implement delete API call
            // await fetch(`http://localhost:3000/api/users/${userId}`, { method: 'DELETE' });
            deleteModal.hide();
            showSuccess('Foydalanuvchi muvaffaqiyatli o\'chirildi!');
            fetchUsers(); // This will now show the loader
        } catch (error) {
            console.error('Error deleting user:', error);
            showError('Foydalanuvchini o\'chirishda xatolik yuz berdi!');
        }
    };
    
    deleteModal.show();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

// Mobile card da action buttons ni yashirish
function generateUserCard(user, index) {
    // ... existing code for cafes and tariffs ...

    return `
        <div class="user-card">
            <div class="user-card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">${user.firstName} ${user.lastName}</h6>
                    <span class="badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}">${user.role}</span>
                </div>
            </div>
            <div class="user-card-body">
                <div class="user-info-row">
                    <span class="user-info-label">ID:</span>
                    <span class="user-info-value">${index + 1}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Login:</span>
                    <span class="user-info-value">${user.email}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Parol:</span>
                    <span class="user-info-value">${user.password}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Kafe:</span>
                    <span class="user-info-value">${cafeNames}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Holati:</span>
                    <span class="user-info-value">${cafeStatuses}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Tarifi:</span>
                    <span class="user-info-value">${cafeTariffs}</span>
                </div>
                <!-- Action buttons ni yashirish -->
                <!--
                <div class="card-actions">
                    <button class="btn btn-sm btn-primary me-2" onclick="editUser('${user._id}')">
                        <i class="bi bi-pencil me-1"></i>Tahrirlash
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser('${user._id}')">
                        <i class="bi bi-trash me-1"></i>O'chirish
                    </button>
                </div>
                -->
            </div>
        </div>
    `;
} 