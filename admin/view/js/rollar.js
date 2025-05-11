// Rollar ma'lumotlarini saqlash uchun massiv
let roles = [
    {
        id: 1,
        name: "Administrator",
        description: "Tizim boshqaruvchisi",
        permissions: ["all"],
        createdAt: "2024-02-20",
    },
    {
        id: 2,
        name: "Menejer",
        description: "Kafe menejeri",
        permissions: ["view_cafes", "edit_cafes", "view_users", "edit_users"],
        createdAt: "2024-02-20",
    },
    {
        id: 3,
        name: "Foydalanuvchi",
        description: "Oddiy foydalanuvchi",
        permissions: ["view_cafes"],
        createdAt: "2024-02-20",
    },
];

// Foydalanuvchilar ma'lumotlarini saqlash uchun massiv
let users = [
    {
      id: 1,
      name: "Adminbek Adminov",
      role: "admin",
      login: "admin",
      password: "admin123",
      permissions: [
        "view_tariffs",
        "edit_tariffs",
        "view_features",
        "edit_features",
        "view_cafes",
        "edit_cafes",
        "view_users",
        "edit_users",
        "view_reports",
        "system_settings",
      ],
      createdAt: "2023-01-01",
      settings: {
        theme: "light",
      },
    },
    {
      id: 2,
      name: "Menejerbek Menejerov",
      role: "manager",
      login: "manager",
      password: "manager123",
      permissions: ["view_tariffs", "edit_tariffs", "view_features", "view_cafes", "edit_cafes", "view_reports"],
      createdAt: "2023-02-15",
      settings: {
        theme: "light",
      },
    },
    {
      id: 3,
      name: "Foydalanuvchiev Foydalanuvchi",
      role: "user",
      login: "user",
      password: "user123",
      permissions: ["view_tariffs", "view_cafes"],
      createdAt: "2023-03-20",
      settings: {
        theme: "light",
      },
    },
  ]

// DOM elementlarini olish
const roleTableBody = document.getElementById("roleTableBody");
const roleForm = document.getElementById("roleForm");
const modalTitle = document.getElementById("roleModalTitle");
const roleIdInput = document.getElementById("roleId");
const roleCodeInput = document.getElementById("roleCode");
const userRoleSelect = document.getElementById("userRole")
const roleNameInput = document.getElementById("roleName");
const roleDescriptionInput = document.getElementById("roleDescription");
const permissionsListElement = document.getElementById("rolePermissionsList");
const saveRoleBtn = document.getElementById("saveRoleBtn");

// Rollar jadvalini yangilash
function updateRolesTable() {
    roleTableBody.innerHTML = "";

    roles.forEach((role) => {
        const row = document.createElement("tr");
        const usersWithRole = users.filter(user => user.role === role.name.toLowerCase()).length;

        row.innerHTML = `
            <td>${role.id}</td>
            <td>${role.name}</td>
            <td>${role.description || "-"}</td>
            <td>${role.permissions.length}</td>
            <td>${usersWithRole}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action edit-role-btn" data-id="${role.id}">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-action delete-role-btn" data-id="${role.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        roleTableBody.appendChild(row);
    });

    // Edit tugmalariga hodisa qo'shish
    document.querySelectorAll(".edit-role-btn").forEach((btn) => {
        btn.addEventListener("click", () => editRole(Number.parseInt(btn.dataset.id)));
    });

    // Delete tugmalariga hodisa qo'shish
    document.querySelectorAll(".delete-role-btn").forEach((btn) => {
        btn.addEventListener("click", () => showDeleteRoleConfirmation(Number.parseInt(btn.dataset.id)));
    });
}

// Ruxsatlar ro'yxatini checkbox sifatida ko'rsatish
function renderPermissionsCheckboxes(selectedPermissions = []) {
    permissionsListElement.innerHTML = "";

    const allPermissions = [
        { id: "all", name: "Barcha ruxsatlar" },
        { id: "view_cafes", name: "Kafelarni ko'rish" },
        { id: "edit_cafes", name: "Kafelarni tahrirlash" },
        { id: "view_users", name: "Foydalanuvchilarni ko'rish" },
        { id: "edit_users", name: "Foydalanuvchilarni tahrirlash" },
        { id: "view_tariffs", name: "Tariflarni ko'rish" },
        { id: "edit_tariffs", name: "Tariflarni tahrirlash" },
        { id: "view_features", name: "Funksiyalarni ko'rish" },
        { id: "edit_features", name: "Funksiyalarni tahrirlash" },
    ];

    allPermissions.forEach((permission) => {
        const isChecked = selectedPermissions.includes(permission.id);

        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
            <div class="form-check">
                <input class="form-check-input permission-checkbox" type="checkbox" value="${permission.id}" id="permission${permission.id}" ${isChecked ? "checked" : ""}>
                <label class="form-check-label" for="permission${permission.id}">
                    ${permission.name}
                </label>
            </div>
        `;

        permissionsListElement.appendChild(li);
    });
}

// Tanlangan ruxsatlarni olish
function getSelectedPermissions() {
    const selectedPermissions = [];
    document.querySelectorAll(".permission-checkbox:checked").forEach((checkbox) => {
        selectedPermissions.push(checkbox.value);
    });
    return selectedPermissions;
}

// Rolni tahrirlash
function editRole(id) {
    const role = roles.find((r) => r.id === id);
    if (!role) return;

    modalTitle.textContent = "Rolni tahrirlash";
    roleIdInput.value = role.id;
    roleNameInput.value = role.name;
    roleCodeInput.value = role.name.toLowerCase();
    roleDescriptionInput.value = role.description || "";

    // Ruxsatlarni belgilash
    renderPermissionsCheckboxes(role.permissions);

    // Modalni ochish
    const modalElement = document.getElementById("addRoleModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Rolni o'chirish tasdiqlash modalni ko'rsatish
function showDeleteRoleConfirmation(id) {
    const role = roles.find((r) => r.id === id);
    if (!role) return;

    // Rol foydalanuvchilar tomonidan ishlatilayotganligini tekshirish
    const isUsed = users.some((user) => user.role === role.name.toLowerCase());

    deleteModalTitle.textContent = "Rolni o'chirish";
    deleteConfirmText.textContent = `Siz rostdan ham "${role.name}" rolini o'chirmoqchimisiz?`;

    if (isUsed) {
        deleteFeatureWarning.style.display = "block";
        deleteFeatureWarning.innerHTML = `
            <i class="bi bi-exclamation-triangle me-2"></i>
            <span>Diqqat! Bu rol ba'zi foydalanuvchilar tomonidan ishlatilmoqda. O'chirilsa, ularning roli "Foydalanuvchi" bo'ladi.</span>
        `;
    } else {
        deleteFeatureWarning.style.display = "none";
    }

    // O'chirish turi va ID ni saqlash
    confirmDeleteBtn.dataset.type = "role";
    confirmDeleteBtn.dataset.id = id;

    // Modalni ochish
    const modalElement = document.getElementById("deleteConfirmModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Yangi rol qo'shish modalni ochish
document.querySelector('[data-bs-target="#addRoleModal"]').addEventListener("click", () => {
    modalTitle.textContent = "Yangi rol qo'shish";
    roleForm.reset();
    roleIdInput.value = "";
    roleCodeInput.value = "";

    // Barcha ruxsatlarni belgilanmagan holatda ko'rsatish
    renderPermissionsCheckboxes([]);
});

// Sahifa yuklanganda
document.addEventListener("DOMContentLoaded", () => {
    // Jadvallarni yangilash
    updateRolesTable();

    // Saqlash tugmasi uchun hodisa qo'shish
    saveRoleBtn.addEventListener("click", () => {
        // Formani tekshirish
        if (!roleForm.checkValidity()) {
            roleForm.reportValidity();
            return;
        }

        const id = roleIdInput.value ? Number.parseInt(roleIdInput.value) : Date.now();
        const name = roleNameInput.value;
        const code = roleCodeInput.value || name.toLowerCase();
        const description = roleDescriptionInput.value;
        const permissions = getSelectedPermissions();
        const today = new Date();
        const createdAt = today.toISOString().split("T")[0];

        const roleData = {
            id,
            name,
            code,
            description,
            permissions,
            createdAt: roleIdInput.value ? roles.find((r) => r.id === id).createdAt : createdAt,
        };

        // Yangi ro'l qo'shish yoki mavjudini yangilash
        if (roleIdInput.value) {
            // Mavjud ro'lni yangilash
            const index = roles.findIndex((r) => r.id === id);
            if (index !== -1) {
                const oldCode = roles[index].code;
                roles[index] = roleData;

                // Agar ro'l kodi o'zgargan bo'lsa, foydalanuvchilarni ham yangilash
                if (oldCode !== code) {
                    users.forEach((user) => {
                        if (user.role === oldCode) {
                            user.role = code;
                        }
                    });
                }

                // Ro'lga tegishli foydalanuvchilarning huquqlarini yangilash
                users.forEach((user) => {
                    if (user.role === code) {
                        user.permissions = [...permissions];
                    }
                });
            }
        } else {
            // Yangi ro'l qo'shish
            roles.push(roleData);
        }

        // Jadval va formani yangilash
        updateRolesTable();

        // Modalni yopish
        const modalElement = document.getElementById("addRoleModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Muvaffaqiyatli xabar ko'rsatish
        showSuccessMessage(roleIdInput.value ? "Ro'l muvaffaqiyatli yangilandi!" : "Yangi ro'l muvaffaqiyatli qo'shildi!");
    });

    // O'chirish tasdiqlash tugmasi uchun hodisa qo'shish
    document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
        const type = confirmDeleteBtn.dataset.type;
        const id = Number.parseInt(confirmDeleteBtn.dataset.id);

        if (type === "role") {
            // Rolni o'chirish
            const index = roles.findIndex((r) => r.id === id);
            if (index !== -1) {
                const role = roles[index];
                
                // Foydalanuvchilarning ro'lini yangilash
                users.forEach((user) => {
                    if (user.role === role.name.toLowerCase()) {
                        user.role = "user";
                        user.permissions = ["view_cafes"];
                    }
                });

                roles.splice(index, 1);
                updateRolesTable();
                showSuccessMessage("Rol muvaffaqiyatli o'chirildi");
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

// Tanlangan ro'l funksiyalarini olish
function getSelectedRolePermissions() {
    const selectedPermissions = []
    document.querySelectorAll(".role-permission-checkbox:checked").forEach((checkbox) => {
      selectedPermissions.push(checkbox.value)
    })
    return selectedPermissions
  }

  // Foydalanuvchi formasi uchun ro'l tanlovini yangilash
function updateUserRoleSelect(selectedRole = null) {
    userRoleSelect.innerHTML = ""
  
    roles.forEach((role) => {
      const option = document.createElement("option")
      option.value = role.code
      option.textContent = role.name
      option.selected = selectedRole === role.code
      userRoleSelect.appendChild(option)
    })
  }


// Ro'lni saqlash
saveRoleBtn.addEventListener("click", () => {
    // Formani tekshirish
    if (!roleForm.checkValidity()) {
      roleForm.reportValidity()
      return
    }
  
    const id = roleIdInput.value ? Number.parseInt(roleIdInput.value) : Date.now()
    const name = roleNameInput.value
    const code = roleCodeInput.value
    const description = roleDescriptionInput.value
    const permissions = getSelectedRolePermissions()
    const today = new Date()
    const createdAt = today.toISOString().split("T")[0]
  
    const roleData = {
      id,
      name,
      code,
      description,
      permissions,
      createdAt: roleIdInput.value ? roles.find((r) => r.id === id).createdAt : createdAt,
    }
  
    // Yangi ro'l qo'shish yoki mavjudini yangilash
    if (roleIdInput.value) {
      // Mavjud ro'lni yangilash
      const index = roles.findIndex((r) => r.id === id)
      if (index !== -1) {
        const oldCode = roles[index].code
        roles[index] = roleData
  
        // Agar ro'l kodi o'zgargan bo'lsa, foydalanuvchilarni ham yangilash
        if (oldCode !== code) {
          users.forEach((user) => {
            if (user.role === oldCode) {
              user.role = code
            }
          })
        }
  
        // Ro'lga tegishli foydalanuvchilarning huquqlarini yangilash
        users.forEach((user) => {
          if (user.role === code) {
            user.permissions = [...permissions]
          }
        })
      }
    } else {
      // Yangi ro'l qo'shish
      roles.push(roleData)
    }
  
    // Jadval va formani yangilash
    updateRolesTable()
  
    // Modalni yopish
    const modalElement = document.getElementById("addRoleModal")
    const modal = bootstrap.Modal.getInstance(modalElement)
    modal.hide()
  
    // Muvaffaqiyatli xabar ko'rsatish
    showSuccessToast(roleIdInput.value ? "Ro'l muvaffaqiyatli yangilandi!" : "Yangi ro'l muvaffaqiyatli qo'shildi!")
  })
  // Muvaffaqiyatli xabar ko'rsatish
function showSuccessToast(message) {
    successToastMessage.textContent = message
    const toast = new bootstrap.Toast(successToast)
    toast.show()
  }
  
  // Xatolik xabarini ko'rsatish
  function showErrorToast(message) {
    errorToastMessage.textContent = message
    const toast = new bootstrap.Toast(errorToast)
    toast.show()
  }