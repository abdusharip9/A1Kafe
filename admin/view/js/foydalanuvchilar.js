// Foydalanuvchilar ma'lumotlarini saqlash uchun massiv
let users = [
    {
        id: 1,
        fullName: "Admin Adminov",
        email: "admin@example.com",
        phone: "+998 90 123 45 67",
        role: "admin",
        createdAt: "2024-02-20",
        permissions: ["view_tariffs", "edit_tariffs", "view_features", "edit_features"]
    },
    {
        id: 2,
        fullName: "Manager Managerov",
        email: "manager@example.com",
        phone: "+998 90 123 45 68",
        role: "manager",
        createdAt: "2024-02-20",
        permissions: ["view_tariffs", "view_features"]
    },
    {
        id: 3,
        fullName: "User Userov",
        email: "user@example.com",
        phone: "+998 90 123 45 69",
        role: "user",
        createdAt: "2024-02-20",
        permissions: ["view_tariffs"]
    },
];

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
        { value: "admin", label: "Administrator" },
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

// Foydalanuvchilar jadvalini yangilash
function updateUsersTable() {
    userTableBody.innerHTML = "";

    users.forEach((user) => {
        const row = document.createElement("tr");

        // Rol nomini o'zbekcha ko'rinishda olish
        let roleText = "";
        switch (user.role) {
            case "admin":
                roleText = "Administrator";
                break;
            case "manager":
                roleText = "Menejer";
                break;
            case "user":
                roleText = "Foydalanuvchi";
                break;
        }

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.fullName}</td>
            <td>${roleText}</td>
            <td>${user.email}</td>
            <td>••••••••</td>
            <td>${user.permissions.length} ta</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action edit-user-btn" data-id="${user.id}">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-action delete-user-btn" data-id="${user.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        userTableBody.appendChild(row);
    });

    // Edit tugmalariga hodisa qo'shish
    document.querySelectorAll(".edit-user-btn").forEach((btn) => {
        btn.addEventListener("click", () => editUser(Number.parseInt(btn.dataset.id)));
    });

    // Delete tugmalariga hodisa qo'shish
    document.querySelectorAll(".delete-user-btn").forEach((btn) => {
        btn.addEventListener("click", () => showDeleteUserConfirmation(Number.parseInt(btn.dataset.id)));
    });
}

// Foydalanuvchini tahrirlash
function editUser(id) {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    modalTitle.textContent = "Foydalanuvchini tahrirlash";
    userIdInput.value = user.id;
    userFullNameInput.value = user.fullName;
    userEmailInput.value = user.email;
    userRoleSelect.value = user.role;

    // Huquqlarni tanlash
    const checkboxes = userPermissionsList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = user.permissions.includes(checkbox.value);
    });

    // Modalni ochish
    const modalElement = document.getElementById("addUserModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

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

    // Jadvallarni yangilash
    updateUsersTable();

    // Yangi foydalanuvchi qo'shish modalni ochish
    document.querySelector('[data-bs-target="#addUserModal"]').addEventListener("click", () => {
        modalTitle.textContent = "Yangi foydalanuvchi qo'shish";
        userForm.reset();
        userIdInput.value = "";
        userRoleSelect.value = ""; // Ro'l tanlashni tozalash

        // Huquqlarni tozalash
        const checkboxes = userPermissionsList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    });

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