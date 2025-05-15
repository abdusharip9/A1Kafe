import { API_URL } from './api-url.js'
import { logout } from './logout.js'
import { verify } from './verify-token.js'

const userData = await verify()
const id = await userData.userDto.id
const token = localStorage.getItem('accessToken')

if (!token || userData.userDto.role !== 'admin') {
	window.location.href = '/login.html'
}

const logoutBtn = document.querySelector('#logoutBtn')
logoutBtn.addEventListener('click', logout)

let allUsers = []; // Store all users for filtering
let currentSort = { column: null, direction: 'asc' };

// Add styles for sortable headers
const style = document.createElement('style');
style.textContent = `
    .sortable {
        cursor: pointer;
        user-select: none;
        transition: background-color 0.2s;
    }
    .sortable:hover {
        background-color: #e9ecef !important;
    }
    .sortable i {
        transition: transform 0.2s;
    }
    .sortable:hover i {
        transform: scale(1.2);
    }
`;
document.head.appendChild(style);

// Fetch and display users
async function fetchUsers() {
    try {
        // Show loader first
        const adminArticle = document.querySelector('#admin');
        adminArticle.innerHTML = `
            <div class="container-fluid px-4 mt-4">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 text-primary">Foydalanuvchilar ro'yxati</h5>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-center align-items-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Then fetch data
        const response = await fetch(`${API_URL}/api/crud/getUsers`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        allUsers = await response.json();
        displayUsers(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        // Show error message in card-body
        const cardBody = document.querySelector('.card-body');
        cardBody.innerHTML = `
            <div class="text-center py-3 text-danger">
                Xatolik yuz berdi. Qaytadan urinib ko'ring.
            </div>
        `;
    }
}

function truncateId(id) {
    return `${id.slice(0, 4)}...${id.slice(-2)}`;
}

function sortUsers(column) {
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }

    const sortedUsers = [...allUsers].sort((a, b) => {
        let valueA, valueB;

        switch (column) {
            case 'id':
                valueA = a._id;
                valueB = b._id;
                break;
            case 'firstName':
                valueA = a.firstName;
                valueB = b.firstName;
                break;
            case 'lastName':
                valueA = a.lastName;
                valueB = b.lastName;
                break;
            case 'email':
                valueA = a.email;
                valueB = b.email;
                break;
            case 'phone':
                valueA = a.phone;
                valueB = b.phone;
                break;
            case 'role':
                valueA = a.role;
                valueB = b.role;
                break;
            case 'isActivated':
                valueA = a.isActivated;
                valueB = b.isActivated;
                break;
            case 'createdAt':
                valueA = new Date(a.createdAt);
                valueB = new Date(b.createdAt);
                break;
            default:
                return 0;
        }

        if (currentSort.direction === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    displayUsers(sortedUsers);
}

function displayUsers(users) {
    const adminArticle = document.querySelector('#admin');
    adminArticle.innerHTML = `
        <div class="container-fluid px-4 mt-4">
            <div class="card shadow-sm">
                <div class="card-header bg-white py-3">
                    <h5 class="mb-0 text-primary">Foydalanuvchilar ro'yxati</h5>
                </div>
                <div class="card-body">
                    ${users && users.length > 0 ? `
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="bg-light">
                                    <tr>
                                        <th class="fw-bold sortable" data-column="id">
                                            ID
                                            <i class='bx bx-sort-alt-2 ms-1'></i>
                                        </th>
                                        <th class="fw-bold sortable" data-column="firstName">
                                            Ism
                                            <i class='bx bx-sort-alt-2 ms-1'></i>
                                        </th>
                                        <th class="fw-bold sortable" data-column="lastName">
                                            Familiya
                                            <i class='bx bx-sort-alt-2 ms-1'></i>
                                        </th>
                                        <th class="fw-bold sortable" data-column="email">
                                            Email
                                            <i class='bx bx-sort-alt-2 ms-1'></i>
                                        </th>
                                        <th class="fw-bold sortable" data-column="phone">
                                            Telefon
                                            <i class='bx bx-sort-alt-2 ms-1'></i>
                                        </th>
                                        <th class="fw-bold sortable" data-column="role">
                                            Rol
                                            <i class='bx bx-sort-alt-2 ms-1'></i>
                                        </th>
                                        <th class="fw-bold sortable" data-column="isActivated">
                                            Faol
                                            <i class='bx bx-sort-alt-2 ms-1'></i>
                                        </th>
                                        <th class="fw-bold sortable" data-column="createdAt">
                                            Yaratilgan
                                            <i class='bx bx-sort-alt-2 ms-1'></i>
                                        </th>
                                        <th class="fw-bold">Kafelar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${users.map(user => `
                                        <tr>
                                            <td>
                                                <span class="truncated-id text-primary" style="cursor: pointer;" 
                                                      data-full-id="${user._id}" 
                                                      title="Click to expand">
                                                    ${truncateId(user._id)}
                                                </span>
                                            </td>
                                            <td>${user.firstName}</td>
                                            <td>${user.lastName}</td>
                                            <td>${user.email}</td>
                                            <td>${user.phone}</td>
                                            <td>
                                                <span class="badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}">
                                                    ${user.role}
                                                </span>
                                            </td>
                                            <td>
                                                <span class="badge ${user.isActivated ? 'bg-success' : 'bg-secondary'}">
                                                    ${user.isActivated ? 'Ha' : 'Yo\'q'}
                                                </span>
                                            </td>
                                            <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-primary" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#cafeModal${user._id}">
                                                    ${user.cafes ? user.cafes.length : 0} ta
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : `
                        <div class="text-center py-3">
                            Foydalanuvchilar topilmadi
                        </div>
                    `}
                </div>
            </div>
        </div>

        <!-- Cafe Modals -->
        ${users.map(user => `
            <div class="modal fade" id="cafeModal${user._id}" tabindex="-1" aria-labelledby="cafeModalLabel${user._id}" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="cafeModalLabel${user._id}">
                                ${user.firstName} ${user.lastName} - Kafelar
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Nomi</th>
                                            <th>Status</th>
                                            <th>Balans</th>
                                            <th>Yaratilgan</th>
                                            <th>Tarif</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${user.cafes ? user.cafes.map(cafe => `
                                            <tr>
                                                <td>${cafe.name}</td>
                                                <td>
                                                    <span class="badge ${cafe.status === 'active' ? 'bg-success' : 'bg-secondary'}">
                                                        ${cafe.status}
                                                    </span>
                                                </td>
                                                <td>${cafe.balance}</td>
                                                <td>${new Date(cafe.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    ${cafe.tariff ? `
                                                        <span class="badge bg-info">
                                                            ${cafe.tariff.name}
                                                        </span>
                                                    ` : 'Tarif yo\'q'}
                                                </td>
                                            </tr>
                                        `).join('') : ''}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}
    `;

    // Add click event listeners to truncated IDs
    document.querySelectorAll('.truncated-id').forEach(element => {
        element.addEventListener('click', function() {
            const fullId = this.getAttribute('data-full-id');
            if (this.textContent === fullId) {
                this.textContent = truncateId(fullId);
            } else {
                this.textContent = fullId;
            }
        });
    });

    // Add click event listeners to sortable headers
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-column');
            sortUsers(column);
            
            // Update sort icons
            document.querySelectorAll('.sortable i').forEach(icon => {
                icon.className = 'bx bx-sort-alt-2 ms-1';
            });
            
            // Update clicked header icon
            const icon = this.querySelector('i');
            if (currentSort.column === column) {
                icon.className = currentSort.direction === 'asc' 
                    ? 'bx bx-sort-up ms-1' 
                    : 'bx bx-sort-down ms-1';
            }
        });
    });
}

// Call fetchUsers when the page loads
fetchUsers();
