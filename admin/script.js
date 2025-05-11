// // Tarif ma'lumotlarini saqlash uchun massiv
// let tariffs = [
//   {
//     id: 1,
//     name: "Standart",
//     durationType: "month",
//     durationCount: 1,
//     price: 50000,
//     features: ["5 GB saqlash hajmi", "10 foydalanuvchi", "Asosiy funksiyalar"],
//   },
//   {
//     id: 2,
//     name: "Premium",
//     durationType: "month",
//     durationCount: 3,
//     price: 120000,
//     features: ["20 GB saqlash hajmi", "Cheksiz foydalanuvchilar", "Barcha funksiyalar", "24/7 qo'llab-quvvatlash"],
//   },
//   {
//     id: 3,
//     name: "Enterprise",
//     durationType: "year",
//     durationCount: 1,
//     price: 500000,
//     features: [
//       "100 GB saqlash hajmi",
//       "Cheksiz foydalanuvchilar",
//       "Barcha funksiyalar",
//       "24/7 qo'llab-quvvatlash",
//       "Maxsus funksiyalar",
//     ],
//   },
// ]

// // Funksiyalar ma'lumotlarini saqlash uchun massiv
// let features = [
//   {
//     id: 1,
//     name: "5 GB saqlash hajmi",
//     description: "Fayllar va ma'lumotlar uchun 5 GB saqlash hajmi",
//     createdAt: "2023-01-15",
//   },
//   {
//     id: 2,
//     name: "10 GB saqlash hajmi",
//     description: "Fayllar va ma'lumotlar uchun 10 GB saqlash hajmi",
//     createdAt: "2023-01-15",
//   },
//   {
//     id: 3,
//     name: "20 GB saqlash hajmi",
//     description: "Fayllar va ma'lumotlar uchun 20 GB saqlash hajmi",
//     createdAt: "2023-01-15",
//   },
//   {
//     id: 4,
//     name: "50 GB saqlash hajmi",
//     description: "Fayllar va ma'lumotlar uchun 50 GB saqlash hajmi",
//     createdAt: "2023-01-15",
//   },
//   {
//     id: 5,
//     name: "100 GB saqlash hajmi",
//     description: "Fayllar va ma'lumotlar uchun 100 GB saqlash hajmi",
//     createdAt: "2023-01-15",
//   },
//   {
//     id: 6,
//     name: "10 foydalanuvchi",
//     description: "Tizimda 10 ta foydalanuvchi yaratish imkoniyati",
//     createdAt: "2023-01-20",
//   },
//   {
//     id: 7,
//     name: "50 foydalanuvchi",
//     description: "Tizimda 50 ta foydalanuvchi yaratish imkoniyati",
//     createdAt: "2023-01-20",
//   },
//   {
//     id: 8,
//     name: "100 foydalanuvchi",
//     description: "Tizimda 100 ta foydalanuvchi yaratish imkoniyati",
//     createdAt: "2023-01-20",
//   },
//   {
//     id: 9,
//     name: "Cheksiz foydalanuvchilar",
//     description: "Tizimda cheksiz miqdorda foydalanuvchi yaratish imkoniyati",
//     createdAt: "2023-01-20",
//   },
//   {
//     id: 10,
//     name: "Asosiy funksiyalar",
//     description: "Tizimning asosiy funksiyalaridan foydalanish imkoniyati",
//     createdAt: "2023-02-01",
//   },
//   {
//     id: 11,
//     name: "Barcha funksiyalar",
//     description: "Tizimning barcha funksiyalaridan foydalanish imkoniyati",
//     createdAt: "2023-02-01",
//   },
//   {
//     id: 12,
//     name: "24/7 qo'llab-quvvatlash",
//     description: "Kunning istalgan vaqtida texnik yordam olish imkoniyati",
//     createdAt: "2023-02-10",
//   },
//   {
//     id: 13,
//     name: "Maxsus funksiyalar",
//     description: "Faqat premium mijozlar uchun maxsus funksiyalar",
//     createdAt: "2023-02-15",
//   },
//   {
//     id: 14,
//     name: "Statistika va hisobotlar",
//     description: "Keng qamrovli statistika va hisobotlarni ko'rish imkoniyati",
//     createdAt: "2023-03-01",
//   },
//   {
//     id: 15,
//     name: "API integratsiyasi",
//     description: "Tashqi tizimlar bilan integratsiya qilish uchun API",
//     createdAt: "2023-03-10",
//   },
//   {
//     id: 16,
//     name: "Mobil ilova",
//     description: "Android va iOS uchun mobil ilovadan foydalanish",
//     createdAt: "2023-03-20",
//   },
//   {
//     id: 17,
//     name: "Eksport qilish imkoniyati",
//     description: "Ma'lumotlarni CSV, Excel va PDF formatlarida eksport qilish",
//     createdAt: "2023-04-01",
//   },
//   {
//     id: 18,
//     name: "Kengaytirilgan xavfsizlik",
//     description: "Ikki bosqichli autentifikatsiya va boshqa xavfsizlik funksiyalari",
//     createdAt: "2023-04-10",
//   },
// ]

// // Kafelar ma'lumotlarini saqlash uchun massiv
// let cafes = [
//   {
//     id: 1,
//     name: "Cafe Central",
//     tariffId: 1,
//     ownerName: "Alisher Karimov",
//     email: "alisher@example.com",
//     phone: "+998 90 123 45 67",
//     createdAt: "2023-05-15",
//   },
//   {
//     id: 2,
//     name: "Coffee House",
//     tariffId: 2,
//     ownerName: "Dilshod Rahimov",
//     email: "dilshod@example.com",
//     phone: "+998 91 234 56 78",
//     createdAt: "2023-06-20",
//   },
//   {
//     id: 3,
//     name: "Milliy Taomlar",
//     tariffId: 3,
//     ownerName: "Nodira Azizova",
//     email: "nodira@example.com",
//     phone: "+998 99 876 54 32",
//     createdAt: "2023-07-10",
//   },
// ]

// // Foydalanuvchilar ma'lumotlarini saqlash uchun massiv
// let users = [
//   {
//     id: 1,
//     name: "Adminbek Adminov",
//     role: "admin",
//     login: "admin",
//     password: "admin123",
//     permissions: [
//       "view_tariffs",
//       "edit_tariffs",
//       "view_features",
//       "edit_features",
//       "view_cafes",
//       "edit_cafes",
//       "view_users",
//       "edit_users",
//       "view_reports",
//       "system_settings",
//     ],
//     createdAt: "2023-01-01",
//     settings: {
//       theme: "light",
//     },
//   },
//   {
//     id: 2,
//     name: "Menejerbek Menejerov",
//     role: "manager",
//     login: "manager",
//     password: "manager123",
//     permissions: ["view_tariffs", "edit_tariffs", "view_features", "view_cafes", "edit_cafes", "view_reports"],
//     createdAt: "2023-02-15",
//     settings: {
//       theme: "light",
//     },
//   },
//   {
//     id: 3,
//     name: "Foydalanuvchiev Foydalanuvchi",
//     role: "user",
//     login: "user",
//     password: "user123",
//     permissions: ["view_tariffs", "view_cafes"],
//     createdAt: "2023-03-20",
//     settings: {
//       theme: "light",
//     },
//   },
// ]

// // Ro'llar ma'lumotlarini saqlash uchun massiv
// let roles = [
//   {
//     id: 1,
//     name: "Administrator",
//     code: "admin",
//     description: "Tizimning barcha funksiyalariga to'liq kirish huquqiga ega",
//     permissions: [
//       "view_tariffs",
//       "edit_tariffs",
//       "view_features",
//       "edit_features",
//       "view_cafes",
//       "edit_cafes",
//       "view_users",
//       "edit_users",
//       "view_roles",
//       "edit_roles",
//       "view_reports",
//       "system_settings",
//     ],
//     createdAt: "2023-01-01",
//   },
//   {
//     id: 2,
//     name: "Menejer",
//     code: "manager",
//     description: "Tariflar va kafelarni boshqarish huquqiga ega",
//     permissions: ["view_tariffs", "edit_tariffs", "view_features", "view_cafes", "edit_cafes", "view_reports"],
//     createdAt: "2023-01-15",
//   },
//   {
//     id: 3,
//     name: "Foydalanuvchi",
//     code: "user",
//     description: "Faqat ko'rish huquqiga ega",
//     permissions: ["view_tariffs", "view_cafes"],
//     createdAt: "2023-01-20",
//   },
// ]

// // Joriy foydalanuvchi
// let currentUser = users[0] // Default: Admin

// // DOM elementlarini olish
// const tariffTableBody = document.getElementById("tariffTableBody")
// const featureTableBody = document.getElementById("featureTableBody")
// const cafeTableBody = document.getElementById("cafeTableBody")
// const userTableBody = document.getElementById("userTableBody")
// const tariffForm = document.getElementById("tariffForm")
// const featureForm = document.getElementById("featureForm")
// const cafeForm = document.getElementById("cafeForm")
// const userForm = document.getElementById("userForm")
// const modalTitle = document.getElementById("modalTitle")
// const featureModalTitle = document.getElementById("featureModalTitle")
// const cafeModalTitle = document.getElementById("cafeModalTitle")
// const userModalTitle = document.getElementById("userModalTitle")
// const tariffIdInput = document.getElementById("tariffId")
// const featureIdInput = document.getElementById("featureId")
// const cafeIdInput = document.getElementById("cafeId")
// const userIdInput = document.getElementById("userId")
// const tariffNameInput = document.getElementById("tariffName")
// const featureNameInput = document.getElementById("featureName")
// const cafeNameInput = document.getElementById("cafeName")
// const userNameInput = document.getElementById("userName")
// const featureDescriptionInput = document.getElementById("featureDescription")
// const tariffPriceInput = document.getElementById("tariffPrice")
// const durationTypeSelect = document.getElementById("durationType")
// const durationCountInput = document.getElementById("durationCount")
// const featuresListElement = document.getElementById("featuresList")
// const cafeTariffSelect = document.getElementById("cafeTariff")
// const userRoleSelect = document.getElementById("userRole")
// const userLoginInput = document.getElementById("userLogin")
// const userPasswordInput = document.getElementById("userPassword")
// const userPermissionsList = document.getElementById("userPermissionsList")
// const ownerNameInput = document.getElementById("ownerName")
// const ownerEmailInput = document.getElementById("ownerEmail")
// const ownerPhoneInput = document.getElementById("ownerPhone")
// const saveTariffBtn = document.getElementById("saveTariffBtn")
// const saveFeatureBtn = document.getElementById("saveFeatureBtn")
// const saveCafeBtn = document.getElementById("saveCafeBtn")
// const saveUserBtn = document.getElementById("saveUserBtn")
// const confirmDeleteBtn = document.getElementById("confirmDeleteBtn")
// const deleteModalTitle = document.getElementById("deleteModalTitle")
// const deleteConfirmText = document.getElementById("deleteConfirmText")
// const deleteFeatureWarning = document.getElementById("deleteFeatureWarning")

// // DOM elementlarini olish (ro'llar uchun)
// const rolesTab = document.getElementById("roles-tab")
// const rolesPage = document.getElementById("roles-page")
// const roleTableBody = document.getElementById("roleTableBody")
// const roleForm = document.getElementById("roleForm")
// const roleModalTitle = document.getElementById("roleModalTitle")
// const roleIdInput = document.getElementById("roleId")
// const roleNameInput = document.getElementById("roleName")
// const roleCodeInput = document.getElementById("roleCode")
// const roleDescriptionInput = document.getElementById("roleDescription")
// const rolePermissionsList = document.getElementById("rolePermissionsList")
// const saveRoleBtn = document.getElementById("saveRoleBtn")

// // DOM elementlarini olish (sozlamalar uchun)
// const settingsTab = document.getElementById("settings-tab")
// const settingsPage = document.getElementById("settings-page")
// const settingsNameInput = document.getElementById("settingsName")
// const settingsLoginInput = document.getElementById("settingsLogin")
// const currentPasswordInput = document.getElementById("currentPassword")
// const newPasswordInput = document.getElementById("newPassword")
// const confirmPasswordInput = document.getElementById("confirmPassword")
// const savePersonalInfoBtn = document.getElementById("savePersonalInfoBtn")
// const changePasswordBtn = document.getElementById("changePasswordBtn")
// const saveSystemSettingsBtn = document.getElementById("saveSystemSettingsBtn")
// const lightThemeRadio = document.getElementById("lightTheme")
// const darkThemeRadio = document.getElementById("darkTheme")
// const autoThemeRadio = document.getElementById("autoTheme")
// const currentUserNameElement = document.getElementById("currentUserName")
// const currentUserRoleElement = document.getElementById("currentUserRole")
// const userInitialsElement = document.getElementById("userInitials")

// // Tab elementlarini olish
// const tariffsTab = document.getElementById("tariffs-tab")
// const featuresTab = document.getElementById("features-tab")
// const cafesTab = document.getElementById("cafes-tab")
// const usersTab = document.getElementById("users-tab")
// const tariffsPage = document.getElementById("tariffs-page")
// const featuresPage = document.getElementById("features-page")
// const cafesPage = document.getElementById("cafes-page")
// const usersPage = document.getElementById("users-page")

// // Toast elementlari
// const successToast = document.getElementById("successToast")
// const errorToast = document.getElementById("errorToast")
// const successToastMessage = document.getElementById("successToastMessage")
// const errorToastMessage = document.getElementById("errorToastMessage")

// // Tab o'zgartirishni boshqarish
// tariffsTab.addEventListener("click", (e) => {  
//   updateTariffsTable()
// })

// featuresTab.addEventListener("click", (e) => {  
//   updateFeaturesTable()
// })

// cafesTab.addEventListener("click", (e) => {  
//   updateCafesTable()
// })

// usersTab.addEventListener("click", (e) => {  
//   updateUsersTable()
// })

// // Tab o'zgartirishni boshqarish (ro'llar uchun)
// rolesTab.addEventListener("click", (e) => {  
//   updateRolesTable()
// })

// // Tab o'zgartirishni boshqarish (sozlamalar uchun)
// settingsTab.addEventListener("click", (e) => {  
//   loadUserSettings()
// })

// // Tariflar jadvalini yangilash
// function updateTariffsTable() {
//   tariffTableBody.innerHTML = ""

//   tariffs.forEach((tariff) => {
//     const row = document.createElement("tr")

//     // Muddat turini o'zbekcha ko'rinishda olish
//     let durationTypeText = ""
//     switch (tariff.durationType) {
//       case "day":
//         durationTypeText = "Kun"
//         break
//       case "month":
//         durationTypeText = "Oy"
//         break
//       case "year":
//         durationTypeText = "Yil"
//         break
//     }

//     row.innerHTML = `
//             <td>${tariff.id}</td>
//             <td>${tariff.name}</td>
//             <td>${durationTypeText}</td>
//             <td>${tariff.durationCount}</td>
//             <td>${tariff.price.toLocaleString()} so'm</td>
//             <td>${tariff.features.length}</td>
//             <td>
//                 <button class="btn btn-sm btn-primary btn-action edit-tariff-btn" data-id="${tariff.id}">
//                     <i class="bi bi-pencil"></i>
//                 </button>
//                 <button class="btn btn-sm btn-danger btn-action delete-tariff-btn" data-id="${tariff.id}">
//                     <i class="bi bi-trash"></i>
//                 </button>
//             </td>
//         `

//     tariffTableBody.appendChild(row)
//   })

//   // Edit tugmalariga hodisa qo'shish
//   document.querySelectorAll(".edit-tariff-btn").forEach((btn) => {
//     btn.addEventListener("click", () => editTariff(Number.parseInt(btn.dataset.id)))
//   })

//   // Delete tugmalariga hodisa qo'shish
//   document.querySelectorAll(".delete-tariff-btn").forEach((btn) => {
//     btn.addEventListener("click", () => showDeleteTariffConfirmation(Number.parseInt(btn.dataset.id)))
//   })
// }

// // Funksiyalar jadvalini yangilash
// function updateFeaturesTable() {
//   featureTableBody.innerHTML = ""

//   features.forEach((feature) => {
//     const row = document.createElement("tr")

//     row.innerHTML = `
//             <td>${feature.id}</td>
//             <td>${feature.name}</td>
//             <td>${feature.description || "-"}</td>
//             <td>${feature.createdAt}</td>
//             <td>
//                 <button class="btn btn-sm btn-primary btn-action edit-feature-btn" data-id="${feature.id}">
//                     <i class="bi bi-pencil"></i>
//                 </button>
//                 <button class="btn btn-sm btn-danger btn-action delete-feature-btn" data-id="${feature.id}">
//                     <i class="bi bi-trash"></i>
//                 </button>
//             </td>
//         `

//     featureTableBody.appendChild(row)
//   })

//   // Edit tugmalariga hodisa qo'shish
//   document.querySelectorAll(".edit-feature-btn").forEach((btn) => {
//     btn.addEventListener("click", () => editFeature(Number.parseInt(btn.dataset.id)))
//   })

//   // Delete tugmalariga hodisa qo'shish
//   document.querySelectorAll(".delete-feature-btn").forEach((btn) => {
//     btn.addEventListener("click", () => showDeleteFeatureConfirmation(Number.parseInt(btn.dataset.id)))
//   })
// }

// // Kafelar jadvalini yangilash
// function updateCafesTable() {
//   cafeTableBody.innerHTML = ""

//   cafes.forEach((cafe) => {
//     const row = document.createElement("tr")
//     const tariff = tariffs.find((t) => t.id === cafe.tariffId) || { name: "Belgilanmagan" }

//     row.innerHTML = `
//             <td>${cafe.id}</td>
//             <td>${cafe.name}</td>
//             <td>${tariff.name}</td>
//             <td>${cafe.ownerName}</td>
//             <td>${cafe.email}</td>
//             <td>${cafe.phone}</td>
//             <td>${cafe.createdAt}</td>
//             <td>
//                 <button class="btn btn-sm btn-primary btn-action edit-cafe-btn" data-id="${cafe.id}">
//                     <i class="bi bi-pencil"></i>
//                 </button>
//                 <button class="btn btn-sm btn-danger btn-action delete-cafe-btn" data-id="${cafe.id}">
//                     <i class="bi bi-trash"></i>
//                 </button>
//             </td>
//         `

//     cafeTableBody.appendChild(row)
//   })

//   // Edit tugmalariga hodisa qo'shish
//   document.querySelectorAll(".edit-cafe-btn").forEach((btn) => {
//     btn.addEventListener("click", () => editCafe(Number.parseInt(btn.dataset.id)))
//   })

//   // Delete tugmalariga hodisa qo'shish
//   document.querySelectorAll(".delete-cafe-btn").forEach((btn) => {
//     btn.addEventListener("click", () => showDeleteCafeConfirmation(Number.parseInt(btn.dataset.id)))
//   })
// }

// // Foydalanuvchilar jadvalini yangilash
// function updateUsersTable() {
//   userTableBody.innerHTML = ""

//   users.forEach((user) => {
//     const row = document.createElement("tr")

//     // Ro'lni o'zbekcha ko'rinishda olish
//     let roleText = ""
//     const userRole = roles.find((r) => r.code === user.role)
//     roleText = userRole ? userRole.name : user.role

//     // Parolni yashirish
//     const maskedPassword = "*".repeat(user.password.length)

//     // Xususiyatlarni qisqa ko'rinishda ko'rsatish
//     const permissionsText =
//       user.permissions.length > 3
//         ? `${user.permissions.slice(0, 3).join(", ")}... (${user.permissions.length})`
//         : user.permissions.join(", ")

//     row.innerHTML = `
//             <td>${user.id}</td>
//             <td>${user.name}</td>
//             <td>${roleText}</td>
//             <td>${user.login}</td>
//             <td>${maskedPassword}</td>
//             <td title="${user.permissions.join(", ")}">${permissionsText}</td>
//             <td>
//                 <button class="btn btn-sm btn-primary btn-action edit-user-btn" data-id="${user.id}">
//                     <i class="bi bi-pencil"></i>
//                 </button>
//                 <button class="btn btn-sm btn-danger btn-action delete-user-btn" data-id="${user.id}">
//                     <i class="bi bi-trash"></i>
//                 </button>
//             </td>
//         `

//     userTableBody.appendChild(row)
//   })

//   // Edit tugmalariga hodisa qo'shish
//   document.querySelectorAll(".edit-user-btn").forEach((btn) => {
//     btn.addEventListener("click", () => editUser(Number.parseInt(btn.dataset.id)))
//   })

//   // Delete tugmalariga hodisa qo'shish
//   document.querySelectorAll(".delete-user-btn").forEach((btn) => {
//     btn.addEventListener("click", () => showDeleteUserConfirmation(Number.parseInt(btn.dataset.id)))
//   })
// }

// // Ro'llar jadvalini yangilash
// function updateRolesTable() {
//   roleTableBody.innerHTML = ""

//   roles.forEach((role) => {
//     const row = document.createElement("tr")

//     // Ro'ldan foydalanuvchilar sonini hisoblash
//     const usersCount = users.filter((user) => user.role === role.code).length

//     row.innerHTML = `
//             <td>${role.id}</td>
//             <td>${role.name}</td>
//             <td>${role.description || "-"}</td>
//             <td>${role.permissions.length}</td>
//             <td>${usersCount}</td>
//             <td>
//                 <button class="btn btn-sm btn-primary btn-action edit-role-btn" data-id="${role.id}">
//                     <i class="bi bi-pencil"></i>
//                 </button>
//                 <button class="btn btn-sm btn-danger btn-action delete-role-btn" data-id="${role.id}">
//                     <i class="bi bi-trash"></i>
//                 </button>
//             </td>
//         `

//     roleTableBody.appendChild(row)
//   })

//   // Edit tugmalariga hodisa qo'shish
//   document.querySelectorAll(".edit-role-btn").forEach((btn) => {
//     btn.addEventListener("click", () => editRole(Number.parseInt(btn.dataset.id)))
//   })

//   // Delete tugmalariga hodisa qo'shish
//   document.querySelectorAll(".delete-role-btn").forEach((btn) => {
//     btn.addEventListener("click", () => showDeleteRoleConfirmation(Number.parseInt(btn.dataset.id)))
//   })
// }

// // Tarif tanlovini yangilash
// function updateTariffSelect(selectedTariffId = null) {
//   cafeTariffSelect.innerHTML = '<option value="">Tarifni tanlang</option>'

//   tariffs.forEach((tariff) => {
//     const option = document.createElement("option")
//     option.value = tariff.id
//     option.textContent = `${tariff.name} (${tariff.price.toLocaleString()} so'm)`
//     option.selected = selectedTariffId === tariff.id
//     cafeTariffSelect.appendChild(option)
//   })
// }

// // Funksiyalar ro'yxatini checkbox sifatida ko'rsatish
// function renderFeaturesCheckboxes(selectedFeatures = []) {
//   featuresListElement.innerHTML = ""

//   features.forEach((feature) => {
//     const isChecked = selectedFeatures.includes(feature.name)

//     const li = document.createElement("li")
//     li.className = "list-group-item"
//     li.innerHTML = `
//       <div class="form-check">
//         <input class="form-check-input feature-checkbox" type="checkbox" value="${feature.name}" id="feature${feature.id}" ${isChecked ? "checked" : ""}>
//         <label class="form-check-label" for="feature${feature.id}">
//           ${feature.name}
//           ${feature.description ? `<small class="d-block text-muted">${feature.description}</small>` : ""}
//         </label>
//       </div>
//     `

//     featuresListElement.appendChild(li)
//   })

//   if (features.length === 0) {
//     featuresListElement.innerHTML = `
//       <li class="list-group-item text-center text-muted">
//         Funksiyalar mavjud emas. Avval funksiyalar qo'shing.
//       </li>
//     `
//   }
// }

// // Foydalanuvchi xususiyatlarini checkbox sifatida ko'rsatish
// function renderUserPermissions(selectedPermissions = []) {
//   const checkboxes = document.querySelectorAll(".permission-checkbox")

//   checkboxes.forEach((checkbox) => {
//     checkbox.checked = selectedPermissions.includes(checkbox.value)
//   })
// }

// // Ro'l funksiyalarini checkbox sifatida ko'rsatish
// function renderRolePermissions(selectedPermissions = []) {
//   const checkboxes = document.querySelectorAll(".role-permission-checkbox")

//   checkboxes.forEach((checkbox) => {
//     checkbox.checked = selectedPermissions.includes(checkbox.value)
//   })
// }

// // Tanlangan funksiyalarni olish
// function getSelectedFeatures() {
//   const selectedFeatures = []
//   document.querySelectorAll(".feature-checkbox:checked").forEach((checkbox) => {
//     selectedFeatures.push(checkbox.value)
//   })
//   return selectedFeatures
// }

// // Tanlangan foydalanuvchi xususiyatlarini olish
// function getSelectedPermissions() {
//   const selectedPermissions = []
//   document.querySelectorAll(".permission-checkbox:checked").forEach((checkbox) => {
//     selectedPermissions.push(checkbox.value)
//   })
//   return selectedPermissions
// }

// // Tanlangan ro'l funksiyalarini olish
// function getSelectedRolePermissions() {
//   const selectedPermissions = []
//   document.querySelectorAll(".role-permission-checkbox:checked").forEach((checkbox) => {
//     selectedPermissions.push(checkbox.value)
//   })
//   return selectedPermissions
// }

// // Tarifni tahrirlash
// function editTariff(id) {
//   const tariff = tariffs.find((t) => t.id === id)
//   if (!tariff) return

//   modalTitle.textContent = "Tarifni tahrirlash"
//   tariffIdInput.value = tariff.id
//   tariffNameInput.value = tariff.name
//   tariffPriceInput.value = tariff.price
//   durationTypeSelect.value = tariff.durationType
//   durationCountInput.value = tariff.durationCount

//   // Funksiyalarni belgilash
//   renderFeaturesCheckboxes(tariff.features)

//   // Modalni ochish
//   const modalElement = document.getElementById("addTariffModal")
//   const modal = new bootstrap.Modal(modalElement)
//   modal.show()
// }

// // Funksiyani tahrirlash
// function editFeature(id) {
//   const feature = features.find((f) => f.id === id)
//   if (!feature) return

//   featureModalTitle.textContent = "Funksiyani tahrirlash"
//   featureIdInput.value = feature.id
//   featureNameInput.value = feature.name
//   featureDescriptionInput.value = feature.description || ""

//   // Modalni ochish
//   const modalElement = document.getElementById("addFeatureModal")
//   const modal = new bootstrap.Modal(modalElement)
//   modal.show()
// }

// // Kafeni tahrirlash
// function editCafe(id) {
//   const cafe = cafes.find((c) => c.id === id)
//   if (!cafe) return

//   cafeModalTitle.textContent = "Kafeni tahrirlash"
//   cafeIdInput.value = cafe.id
//   cafeNameInput.value = cafe.name
//   ownerNameInput.value = cafe.ownerName
//   ownerEmailInput.value = cafe.email
//   ownerPhoneInput.value = cafe.phone

//   // Tarif tanlovini yangilash
//   updateTariffSelect(cafe.tariffId)

//   // Modalni ochish
//   const modalElement = document.getElementById("addCafeModal")
//   const modal = new bootstrap.Modal(modalElement)
//   modal.show()
// }

// // Foydalanuvchini tahrirlash
// function editUser(id) {
//   const user = users.find((u) => u.id === id)
//   if (!user) return

//   userModalTitle.textContent = "Foydalanuvchini tahrirlash"
//   userIdInput.value = user.id
//   userNameInput.value = user.name
//   userLoginInput.value = user.login
//   userPasswordInput.value = user.password

//   // Ro'l tanlovini yangilash
//   updateUserRoleSelect(user.role)

//   // Xususiyatlarni belgilash
//   renderUserPermissions(user.permissions)

//   // Modalni ochish
//   const modalElement = document.getElementById("addUserModal")
//   const modal = new bootstrap.Modal(modalElement)
//   modal.show()
// }

// // Ro'lni tahrirlash
// function editRole(id) {
//   const role = roles.find((r) => r.id === id)
//   if (!role) return

//   roleModalTitle.textContent = "Ro'lni tahrirlash"
//   roleIdInput.value = role.id
//   roleNameInput.value = role.name
//   roleCodeInput.value = role.code
//   roleDescriptionInput.value = role.description || ""

//   // Funksiyalarni belgilash
//   renderRolePermissions(role.permissions)

//   // Modalni ochish
//   const modalElement = document.getElementById("addRoleModal")
//   const modal = new bootstrap.Modal(modalElement)
//   modal.show()
// }

// // Foydalanuvchi sozlamalarini yuklash
// function loadUserSettings() {
//   // Shaxsiy ma'lumotlarni yuklash
//   settingsNameInput.value = currentUser.name
//   settingsLoginInput.value = currentUser.login

//   // Mavzu sozlamalarini yuklash
//   const userTheme = currentUser.settings?.theme || "light"

//   if (userTheme === "light") {
//     lightThemeRadio.checked = true
//   } else if (userTheme === "dark") {
//     darkThemeRadio.checked = true
//   } else if (userTheme === "auto") {
//     autoThemeRadio.checked = true
//   }
// }

// // Mavzuni o'zgartirish
// function changeTheme(theme) {
//   const htmlElement = document.documentElement

//   if (theme === "auto") {
//     // Tizim mavzusini aniqlash
//     const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
//     htmlElement.setAttribute("data-bs-theme", prefersDarkMode ? "dark" : "light")
//   } else {
//     htmlElement.setAttribute("data-bs-theme", theme)
//   }

//   // Foydalanuvchi sozlamalarini yangilash
//   if (!currentUser.settings) {
//     currentUser.settings = {}
//   }
//   currentUser.settings.theme = theme
// }

// // Foydalanuvchi ma'lumotlarini yangilash
// function updateUserInfo() {
//   // Foydalanuvchi ismini va rolini ko'rsatish
//   currentUserNameElement.textContent = currentUser.name

//   // Ro'lni o'zbekcha ko'rinishda olish
//   const userRole = roles.find((r) => r.code === currentUser.role)
//   currentUserRoleElement.textContent = userRole ? userRole.name : currentUser.role

//   // Foydalanuvchi harflarini olish
//   const nameParts = currentUser.name.split(" ")
//   let initials = ""

//   if (nameParts.length >= 2) {
//     initials = nameParts[0].charAt(0) + nameParts[1].charAt(0)
//   } else if (nameParts.length === 1) {
//     initials = nameParts[0].charAt(0)
//   }

//   userInitialsElement.textContent = initials.toUpperCase()
// }

// // Yangi tarif qo'shish modalni ochish
// document.querySelector('[data-bs-target="#addTariffModal"]').addEventListener("click", () => {
//   modalTitle.textContent = "Yangi tarif qo'shish"
//   tariffForm.reset()
//   tariffIdInput.value = ""

//   // Barcha funksiyalarni belgilanmagan holatda ko'rsatish
//   renderFeaturesCheckboxes([])
// })

// // Yangi funksiya qo'shish modalni ochish
// document.querySelector('[data-bs-target="#addFeatureModal"]').addEventListener("click", () => {
//   featureModalTitle.textContent = "Yangi funksiya qo'shish"
//   featureForm.reset()
//   featureIdInput.value = ""
// })

// // Yangi kafe qo'shish modalni ochish
// document.querySelector('[data-bs-target="#addCafeModal"]').addEventListener("click", () => {
//   cafeModalTitle.textContent = "Yangi kafe qo'shish"
//   cafeForm.reset()
//   cafeIdInput.value = ""

//   // Tarif tanlovini yangilash
//   updateTariffSelect()
// })

// // Foydalanuvchi formasi uchun ro'l tanlovini yangilash
// function updateUserRoleSelect(selectedRole = null) {
//   userRoleSelect.innerHTML = ""

//   roles.forEach((role) => {
//     const option = document.createElement("option")
//     option.value = role.code
//     option.textContent = role.name
//     option.selected = selectedRole === role.code
//     userRoleSelect.appendChild(option)
//   })
// }

// // Foydalanuvchi ro'li o'zgartirilganda, uning huquqlarini yangilash
// userRoleSelect.addEventListener("change", function () {
//   const selectedRoleCode = this.value
//   const selectedRole = roles.find((role) => role.code === selectedRoleCode)

//   if (selectedRole) {
//     // Ro'lga tegishli huquqlarni belgilash
//     renderUserPermissions(selectedRole.permissions)
//   }
// })

// // Yangi foydalanuvchi qo'shish modalni ochish (ro'llar bilan)
// document.querySelector('[data-bs-target="#addUserModal"]').addEventListener("click", () => {
//   userModalTitle.textContent = "Yangi foydalanuvchi qo'shish"
//   userForm.reset()
//   userIdInput.value = ""

//   // Ro'l tanlovini yangilash
//   updateUserRoleSelect("user") // Default ro'l

//   // Tanlangan ro'lning huquqlarini belgilash
//   const defaultRole = roles.find((role) => role.code === "user")
//   if (defaultRole) {
//     renderUserPermissions(defaultRole.permissions)
//   } else {
//     renderUserPermissions([])
//   }
// })

// // Yangi ro'l qo'shish modalni ochish
// document.querySelector('[data-bs-target="#addRoleModal"]').addEventListener("click", () => {
//   roleModalTitle.textContent = "Yangi ro'l qo'shish"
//   roleForm.reset()
//   roleIdInput.value = ""

//   // Barcha funksiyalarni belgilanmagan holatda ko'rsatish
//   renderRolePermissions([])
// })

// // Parolni ko'rsatish/yashirish
// document.querySelectorAll(".toggle-password").forEach((button) => {
//   button.addEventListener("click", function () {
//     const targetId = this.getAttribute("data-target")
//     const passwordInput = document.getElementById(targetId)
//     const icon = this.querySelector("i")

//     if (passwordInput.type === "password") {
//       passwordInput.type = "text"
//       icon.classList.remove("bi-eye")
//       icon.classList.add("bi-eye-slash")
//     } else {
//       passwordInput.type = "password"
//       icon.classList.remove("bi-eye-slash")
//       icon.classList.add("bi-eye")
//     }
//   })
// })

// // Shaxsiy ma'lumotlarni saqlash
// savePersonalInfoBtn.addEventListener("click", () => {
//   // Formani tekshirish
//   const personalInfoForm = document.getElementById("personalInfoForm")
//   if (!personalInfoForm.checkValidity()) {
//     personalInfoForm.reportValidity()
//     return
//   }

//   const newName = settingsNameInput.value
//   const newLogin = settingsLoginInput.value

//   // Foydalanuvchi ma'lumotlarini yangilash
//   currentUser.name = newName
//   currentUser.login = newLogin

//   // Foydalanuvchilar jadvalini yangilash
//   updateUsersTable()

//   // Foydalanuvchi ma'lumotlarini yangilash
//   updateUserInfo()

//   // Muvaffaqiyatli xabar ko'rsatish
//   showSuccessToast("Shaxsiy ma'lumotlar muvaffaqiyatli saqlandi!")
// })

// // Parolni o'zgartirish
// changePasswordBtn.addEventListener("click", () => {
//   // Formani tekshirish
//   const changePasswordForm = document.getElementById("changePasswordForm")
//   if (!changePasswordForm.checkValidity()) {
//     changePasswordForm.reportValidity()
//     return
//   }

//   const currentPassword = currentPasswordInput.value
//   const newPassword = newPasswordInput.value
//   const confirmPassword = confirmPasswordInput.value

//   // Joriy parolni tekshirish
//   if (currentPassword !== currentUser.password) {
//     showErrorToast("Joriy parol noto'g'ri!")
//     return
//   }

//   // Yangi parolni tasdiqlash
//   if (newPassword !== confirmPassword) {
//     showErrorToast("Yangi parol va tasdiqlash paroli mos kelmaydi!")
//     return
//   }

//   // Parolni yangilash
//   currentUser.password = newPassword

//   // Foydalanuvchilar jadvalini yangilash
//   updateUsersTable()

//   // Formani tozalash
//   changePasswordForm.reset()

//   // Muvaffaqiyatli xabar ko'rsatish
//   showSuccessToast("Parol muvaffaqiyatli o'zgartirildi!")
// })

// // Tizim sozlamalarini saqlash
// saveSystemSettingsBtn.addEventListener("click", () => {
//   // Tanlangan mavzuni olish
//   const selectedTheme = document.querySelector('input[name="themeMode"]:checked').value

//   // Mavzuni o'zgartirish
//   changeTheme(selectedTheme)

//   // Muvaffaqiyatli xabar ko'rsatish
//   showSuccessToast("Tizim sozlamalari muvaffaqiyatli saqlandi!")
// })

// // Ro'lni saqlash
// saveRoleBtn.addEventListener("click", () => {
//   // Formani tekshirish
//   if (!roleForm.checkValidity()) {
//     roleForm.reportValidity()
//     return
//   }

//   const id = roleIdInput.value ? Number.parseInt(roleIdInput.value) : Date.now()
//   const name = roleNameInput.value
//   const code = roleCodeInput.value
//   const description = roleDescriptionInput.value
//   const permissions = getSelectedRolePermissions()
//   const today = new Date()
//   const createdAt = today.toISOString().split("T")[0]

//   const roleData = {
//     id,
//     name,
//     code,
//     description,
//     permissions,
//     createdAt: roleIdInput.value ? roles.find((r) => r.id === id).createdAt : createdAt,
//   }

//   // Yangi ro'l qo'shish yoki mavjudini yangilash
//   if (roleIdInput.value) {
//     // Mavjud ro'lni yangilash
//     const index = roles.findIndex((r) => r.id === id)
//     if (index !== -1) {
//       const oldCode = roles[index].code
//       roles[index] = roleData

//       // Agar ro'l kodi o'zgargan bo'lsa, foydalanuvchilarni ham yangilash
//       if (oldCode !== code) {
//         users.forEach((user) => {
//           if (user.role === oldCode) {
//             user.role = code
//           }
//         })
//       }

//       // Ro'lga tegishli foydalanuvchilarning huquqlarini yangilash
//       users.forEach((user) => {
//         if (user.role === code) {
//           user.permissions = [...permissions]
//         }
//       })
//     }
//   } else {
//     // Yangi ro'l qo'shish
//     roles.push(roleData)
//   }

//   // Jadval va formani yangilash
//   updateRolesTable()
//   updateUsersTable()

//   // Modalni yopish
//   const modalElement = document.getElementById("addRoleModal")
//   const modal = bootstrap.Modal.getInstance(modalElement)
//   modal.hide()

//   // Muvaffaqiyatli xabar ko'rsatish
//   showSuccessToast(roleIdInput.value ? "Ro'l muvaffaqiyatli yangilandi!" : "Yangi ro'l muvaffaqiyatli qo'shildi!")
// })

// // Foydalanuvchini saqlash (ro'llar bilan)
// saveUserBtn.addEventListener("click", () => {
//   // Formani tekshirish
//   if (!userForm.checkValidity()) {
//     userForm.reportValidity()
//     return
//   }

//   const id = userIdInput.value ? Number.parseInt(userIdInput.value) : Date.now()
//   const name = userNameInput.value
//   const role = userRoleSelect.value
//   const login = userLoginInput.value
//   const password = userPasswordInput.value
//   const permissions = getSelectedPermissions()
//   const today = new Date()
//   const createdAt = today.toISOString().split("T")[0]

//   const userData = {
//     id,
//     name,
//     role,
//     login,
//     password,
//     permissions,
//     createdAt: userIdInput.value ? users.find((u) => u.id === id).createdAt : createdAt,
//     settings: userIdInput.value ? users.find((u) => u.id === id).settings || { theme: "light" } : { theme: "light" },
//   }

//   // Yangi foydalanuvchi qo'shish yoki mavjudini yangilash
//   if (userIdInput.value) {
//     // Mavjud foydalanuvchini yangilash
//     const index = users.findIndex((u) => u.id === id)
//     if (index !== -1) {
//       users[index] = userData

//       // Agar joriy foydalanuvchi yangilangan bo'lsa, ma'lumotlarni yangilash
//       if (currentUser.id === id) {
//         currentUser = userData
//         updateUserInfo()
//       }
//     }
//   } else {
//     // Yangi foydalanuvchi qo'shish
//     users.push(userData)
//   }

//   // Jadval va formani yangilash
//   updateUsersTable()

//   // Modalni yopish
//   const modalElement = document.getElementById("addUserModal")
//   const modal = bootstrap.Modal.getInstance(modalElement)
//   modal.hide()

//   // Muvaffaqiyatli xabar ko'rsatish
//   showSuccessToast(
//     userIdInput.value ? "Foydalanuvchi muvaffaqiyatli yangilandi!" : "Yangi foydalanuvchi muvaffaqiyatli qo'shildi!",
//   )
// })

// // Ro'lni o'chirish tasdiqlash modalni ko'rsatish
// function showDeleteRoleConfirmation(id) {
//   const role = roles.find((r) => r.id === id)
//   if (!role) return

//   // Ro'l foydalanuvchilar tomonidan ishlatilayotganligini tekshirish
//   const isUsed = users.some((user) => user.role === role.code)

//   deleteModalTitle.textContent = "Ro'lni o'chirish"
//   deleteConfirmText.textContent = `Siz rostdan ham "${role.name}" ro'lini o'chirmoqchimisiz?`

//   if (isUsed) {
//     deleteFeatureWarning.style.display = "block"
//     deleteFeatureWarning.innerHTML = `
//       <i class="bi bi-exclamation-triangle me-2"></i>
//       <span>Diqqat! Bu ro'l ba'zi foydalanuvchilar tomonidan ishlatilmoqda. O'chirilsa, ularning ro'li "Foydalanuvchi" bo'ladi.</span>
//     `
//   } else {
//     deleteFeatureWarning.style.display = "none"
//   }

//   // O'chirish turi va ID ni saqlash
//   confirmDeleteBtn.dataset.type = "role"
//   confirmDeleteBtn.dataset.id = id

//   // Modalni ochish
//   const modalElement = document.getElementById("deleteConfirmModal")
//   const modal = new bootstrap.Modal(modalElement)
//   modal.show()
// }

// // Tarifni, funksiyani, kafeni, foydalanuvchini yoki ro'lni o'chirish
// confirmDeleteBtn.addEventListener("click", () => {
//   const type = confirmDeleteBtn.dataset.type
//   const id = Number.parseInt(confirmDeleteBtn.dataset.id)

//   if (type === "tariff") {
//     // Tarifni o'chirish
//     tariffs = tariffs.filter((t) => t.id !== id)

//     // Kafelarning tarif ID sini null ga o'zgartirish
//     cafes.forEach((cafe) => {
//       if (cafe.tariffId === id) {
//         cafe.tariffId = null
//       }
//     })

//     updateTariffsTable()
//     updateCafesTable()
//     showSuccessToast("Tarif muvaffaqiyatli o'chirildi!")
//   } else if (type === "feature") {
//     // Funksiyani o'chirish
//     const feature = features.find((f) => f.id === id)
//     if (feature) {
//       const featureName = feature.name

//       // Funksiyani o'chirish
//       features = features.filter((f) => f.id !== id)

//       // Tariflardan ham bu funksiyani o'chirish
//       tariffs.forEach((tariff) => {
//         tariff.features = tariff.features.filter((f) => f !== featureName)
//       })

//       updateFeaturesTable()
//       updateTariffsTable()
//       showSuccessToast("Funksiya muvaffaqiyatli o'chirildi!")
//     }
//   } else if (type === "cafe") {
//     // Kafeni o'chirish
//     cafes = cafes.filter((c) => c.id !== id)
//     updateCafesTable()
//     showSuccessToast("Kafe muvaffaqiyatli o'chirildi!")
//   } else if (type === "user") {
//     // Foydalanuvchini o'chirish
//     // Joriy foydalanuvchini o'chirishga yo'l qo'ymaslik
//     if (id === currentUser.id) {
//       showErrorToast("Siz o'zingizni o'chira olmaysiz!")
//     } else {
//       users = users.filter((u) => u.id !== id)
//       updateUsersTable()
//       showSuccessToast("Foydalanuvchi muvaffaqiyatli o'chirildi!")
//     }
//   } else if (type === "role") {
//     // Ro'lni o'chirish
//     const role = roles.find((r) => r.id === id)
//     if (role) {
//       const roleCode = role.code

//       // Admin ro'lini o'chirishga yo'l qo'ymaslik
//       if (roleCode === "admin") {
//         showErrorToast("Admin ro'lini o'chirib bo'lmaydi!")
//       } else {
//         // Ro'lni o'chirish
//         roles = roles.filter((r) => r.id !== id)

//         // Foydalanuvchilarning ro'lini "user" ga o'zgartirish
//         users.forEach((user) => {
//           if (user.role === roleCode) {
//             user.role = "user"
//             // Foydalanuvchi huquqlarini "user" ro'li huquqlariga o'zgartirish
//             const userRole = roles.find((r) => r.code === "user")
//             if (userRole) {
//               user.permissions = [...userRole.permissions]
//             }
//           }
//         })

//         updateRolesTable()
//         updateUsersTable()
//         showSuccessToast("Ro'l muvaffaqiyatli o'chirildi!")
//       }
//     }
//   }

//   // Modalni yopish
//   const modalElement = document.getElementById("deleteConfirmModal")
//   const modal = bootstrap.Modal.getInstance(modalElement)
//   modal.hide()
// })

// // Muvaffaqiyatli xabar ko'rsatish
// function showSuccessToast(message) {
//   successToastMessage.textContent = message
//   const toast = new bootstrap.Toast(successToast)
//   toast.show()
// }

// // Xatolik xabarini ko'rsatish
// function showErrorToast(message) {
//   errorToastMessage.textContent = message
//   const toast = new bootstrap.Toast(errorToast)
//   toast.show()
// }

// // Tarifni o'chirish tasdiqlash modalni ko'rsatish
// function showDeleteTariffConfirmation(id) {
//   const tariff = tariffs.find((t) => t.id === id)
//   if (!tariff) return

//   // Tarif kafelar tomonidan ishlatilayotganligini tekshirish
//   const isUsed = cafes.some((cafe) => cafe.tariffId === id)

//   deleteModalTitle.textContent = "Tarifni o'chirish"
//   deleteConfirmText.textContent = `Siz rostdan ham "${tariff.name}" tarifini o'chirmoqchimisiz?`

//   if (isUsed) {
//     deleteFeatureWarning.style.display = "block"
//     deleteFeatureWarning.innerHTML = `
//       <i class="bi bi-exclamation-triangle me-2"></i>
//       <span>Diqqat! Bu tarif ba'zi kafelar tomonidan ishlatilmoqda. O'chirilsa, ularning tarifi "Belgilanmagan" bo'ladi.</span>
//     `
//   } else {
//     deleteFeatureWarning.style.display = "none"
//   }

//   // O'chirish turi va ID ni saqlash
//   confirmDeleteBtn.dataset.type = "tariff"
//   confirmDeleteBtn.dataset.id = id

//   // Modalni ochish
//   const modalElement = document.getElementById("deleteConfirmModal")
//   const modal = new bootstrap.Modal(modalElement)
//   modal.show()
// }

// function showDeleteFeatureConfirmation(id) {
//   const feature = features.find((f) => f.id === id)
//   if (!feature) return

//   deleteModalTitle.textContent = "Funksiyani o'chirish"
//   deleteConfirmText.textContent = `Siz rostdan ham "${feature.name}" funksiyasini o'chirmoqchimisiz?`

//   // Funksiya tariflar tomonidan ishlatilayotganligini tekshirish
//   const isUsed = tariffs.some((tariff) => tariff.features.includes(feature.name))
//   deleteFeatureWarning.style.display = isUsed ? "block" : "none"
//   deleteFeatureWarning.innerHTML = `
//     <i class="bi bi-exclamation-triangle me-2"></i>
//     <span>Diqqat! Bu funksiya ba'zi tariflarda ishlatilmoqda. O'chirilsa, u barcha tariflardan ham o'chiriladi.</span>
//   `

//   // O'chirish turi va ID ni saqlash
//   confirmDeleteBtn.dataset.type = "feature"
//   confirmDeleteBtn.dataset.id = id

//   // Modalni ochish
//   const modalElement = document.getElementById("deleteConfirmModal")
//   const modal = new bootstrap.Modal(modalElement)
//   modal.show()
// }

// function showDeleteCafeConfirmation(id) {
//   const cafe = cafes.find((c) => c.id === id)
//   if (!cafe) return

//   deleteModalTitle.textContent = "Kafeni o'chirish"
//   deleteConfirmText.textContent = `Siz rostdan ham "${cafe.name}" kafesini o'chirmoqchimisiz?`
//   deleteFeatureWarning.style.display = "none"

//   // O'chirish turi va ID ni saqlash
//   confirmDeleteBtn.dataset.type = "cafe"
//   confirmDeleteBtn.dataset.id = id

//   // Modalni ochish
//   const modalElement = document.getElementById("deleteConfirmModal")
//   const modal = new bootstrap.Modal(modalElement)
//   modal.show()
// }

// function showDeleteUserConfirmation(id) {
//   const user = users.find((u) => u.id === id)
//   if (!user) return

//   deleteModalTitle.textContent = "Foydalanuvchini o'chirish"
//   deleteConfirmText.textContent = `Siz rostdan ham "${user.name}" foydalanuvchini o'chirmoqchimisiz?`
//   deleteFeatureWarning.style.display = "none"

//   // O'chirish turi va ID ni saqlash
//   confirmDeleteBtn.dataset.type = "user"
//   confirmDeleteBtn.dataset.id = id

//   // Modalni ochish
//   const modalElement = document.getElementById("deleteConfirmModal")
//   const modal = new bootstrap.Modal(modalElement)
//   modal.show()
// }

// // So'nggi faoliyatlar ro'yxati
// let recentActivities = [
//     {
//         time: "2024-03-20 10:30",
//         user: "Adminbek Adminov",
//         action: "Yangi kafe qo'shildi",
//         details: "Cafe Central"
//     },
//     {
//         time: "2024-03-20 09:15",
//         user: "Adminbek Adminov",
//         action: "Tarif yangilandi",
//         details: "Premium tarif"
//     },
//     {
//         time: "2024-03-19 16:45",
//         user: "Adminbek Adminov",
//         action: "Yangi foydalanuvchi qo'shildi",
//         details: "Dilshod Rahimov"
//     }
// ];

// // Dashboard statistikalarini yangilash
// function updateDashboardStats() {
//     document.getElementById('totalCafes').textContent = cafes.length;
//     document.getElementById('totalUsers').textContent = users.length;
//     document.getElementById('activeTariffs').textContent = tariffs.length;
//     document.getElementById('totalFeatures').textContent = features.length;
// }

// // Kafelar statistikasi grafigi
// function updateCafesChart() {
//     const ctx = document.getElementById('cafesChart').getContext('2d');
//     const tariffCounts = {};
    
//     // Har bir tarif uchun kafelar sonini hisoblash
//     cafes.forEach(cafe => {
//         const tariff = tariffs.find(t => t.id === cafe.tariffId);
//         if (tariff) {
//             tariffCounts[tariff.name] = (tariffCounts[tariff.name] || 0) + 1;
//         }
//     });

//     new Chart(ctx, {
//         type: 'pie',
//         data: {
//             labels: Object.keys(tariffCounts),
//             datasets: [{
//                 data: Object.values(tariffCounts),
//                 backgroundColor: [
//                     '#0d6efd',
//                     '#198754',
//                     '#0dcaf0',
//                     '#ffc107'
//                 ]
//             }]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: 'bottom'
//                 }
//             }
//         }
//     });
// }

// // Tariflar statistikasi grafigi
// function updateTariffsChart() {
//     const ctx = document.getElementById('tariffsChart').getContext('2d');
//     const prices = tariffs.map(t => t.price);
//     const labels = tariffs.map(t => t.name);

//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Tarif narxi',
//                 data: prices,
//                 backgroundColor: '#0d6efd'
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// }

// // So'nggi faoliyatlarni yangilash
// function updateRecentActivities() {
//     const tbody = document.getElementById('recentActivities');
//     tbody.innerHTML = '';

//     recentActivities.forEach(activity => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${activity.time}</td>
//             <td>${activity.user}</td>
//             <td>${activity.action}</td>
//             <td>${activity.details}</td>
//         `;
//         tbody.appendChild(row);
//     });
// }

// // Dashboard sahifasini yangilash
// function updateDashboard() {
//     updateDashboardStats();
//     updateCafesChart();
//     updateTariffsChart();
//     updateRecentActivities();
// }

// // Sahifalar orasida o'tish
// function switchTab(tabId) {
//     // Barcha sahifalarni yashirish
//     document.getElementById('dashboard-page').style.display = 'none';
//     document.getElementById('tariffs-page').style.display = 'none';
//     document.getElementById('features-page').style.display = 'none';
//     document.getElementById('cafes-page').style.display = 'none';
//     document.getElementById('users-page').style.display = 'none';
//     document.getElementById('roles-page').style.display = 'none';
//     document.getElementById('settings-page').style.display = 'none';

//     // Tanlangan sahifani ko'rsatish
//     document.getElementById(tabId + '-page').style.display = 'block';

//     // Barcha tablarni inactive qilish
//     document.querySelectorAll('.nav-link').forEach(link => {
//         link.classList.remove('active');
//     });

//     // Tanlangan tabni active qilish
//     document.getElementById(tabId + '-tab').classList.add('active');

//     // Agar dashboard sahifasi tanlangan bo'lsa, statistikani yangilash
//     if (tabId === 'dashboard') {
//         updateDashboard();
//     }
// }

// // Tab o'zgartirish uchun event listenerlar
// document.addEventListener('DOMContentLoaded', function() {
//     // Chart.js kutubxonasini qo'shish
//     const script = document.createElement('script');
//     script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
//     script.onload = function() {
//         updateDashboard();
//     };
//     document.head.appendChild(script);

//     // Tab o'zgartirish uchun event listenerlar
//     document.getElementById('dashboard-tab').addEventListener('click', () => switchTab('dashboard'));
//     document.getElementById('tariffs-tab').addEventListener('click', () => switchTab('tariffs'));
//     document.getElementById('features-tab').addEventListener('click', () => switchTab('features'));
//     document.getElementById('cafes-tab').addEventListener('click', () => switchTab('cafes'));
//     document.getElementById('users-tab').addEventListener('click', () => switchTab('users'));
//     document.getElementById('roles-tab').addEventListener('click', () => switchTab('roles'));
//     document.getElementById('settings-tab').addEventListener('click', () => switchTab('settings'));

//     // Foydalanuvchi ma'lumotlarini yangilash
//     updateUserInfo();

//     // Mavzuni o'rnatish
//     const userTheme = currentUser.settings?.theme || "light";
//     changeTheme(userTheme);

//     // Jadvallarni yangilash
//     updateTariffsTable();
//     updateUserRoleSelect();
//     updateRolesTable();
//     updateUsersTable();

//     // bootstrap variable declaration
//     window.bootstrap = bootstrap;
// });

// // Profil sozlamalarini saqlash
// document.getElementById('profileSettingsForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const name = document.getElementById('profileName').value;
//     const email = document.getElementById('profileEmail').value;
//     const phone = document.getElementById('profilePhone').value;

//     // Foydalanuvchi ma'lumotlarini yangilash
//     currentUser.name = name;
//     currentUser.email = email;
//     currentUser.phone = phone;

//     // Foydalanuvchi ma'lumotlarini yangilash
//     updateUserInfo();
    
//     showSuccessToast('Profil ma\'lumotlari muvaffaqiyatli saqlandi');
// });

// // Xavfsizlik sozlamalarini saqlash
// document.getElementById('securitySettingsForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const currentPassword = document.getElementById('currentPassword').value;
//     const newPassword = document.getElementById('newPassword').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     // Parolni tekshirish
//     if (currentPassword !== currentUser.password) {
//         showErrorToast('Joriy parol noto\'g\'ri');
//         return;
//     }

//     // Yangi parollarni tekshirish
//     if (newPassword !== confirmPassword) {
//         showErrorToast('Yangi parollar mos kelmadi');
//         return;
//     }

//     // Parolni yangilash
//     currentUser.password = newPassword;
    
//     // Formani tozalash
//     this.reset();
    
//     showSuccessToast('Parol muvaffaqiyatli o\'zgartirildi');
// });

// // Ko'rinish sozlamalarini saqlash
// function saveAppearanceSettings() {
//     const theme = document.querySelector('input[name="theme"]:checked').value;
//     const tableDensity = document.getElementById('tableDensity').value;

//     // Mavzuni o'zgartirish
//     changeTheme(theme);

//     // Jadval ko'rinishini o'zgartirish
//     document.querySelectorAll('.table').forEach(table => {
//         if (tableDensity === 'compact') {
//             table.classList.add('table-sm');
//         } else {
//             table.classList.remove('table-sm');
//         }
//     });

//     // Sozlamalarni saqlash
//     currentUser.settings = {
//         ...currentUser.settings,
//         theme: theme,
//         tableDensity: tableDensity
//     };

//     showSuccessToast('Ko\'rinish sozlamalari muvaffaqiyatli saqlandi');
// }

// // Bildirishnomalar sozlamalarini saqlash
// function saveNotificationSettings() {
//     const emailNotifications = document.getElementById('emailNotifications').checked;
//     const systemNotifications = document.getElementById('systemNotifications').checked;
//     const securityNotifications = document.getElementById('securityNotifications').checked;

//     // Sozlamalarni saqlash
//     currentUser.settings = {
//         ...currentUser.settings,
//         notifications: {
//             email: emailNotifications,
//             system: systemNotifications,
//             security: securityNotifications
//         }
//     };

//     showSuccessToast('Bildirishnomalar sozlamalari muvaffaqiyatli saqlandi');
// }
