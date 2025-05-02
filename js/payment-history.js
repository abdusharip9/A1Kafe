import { API_URL } from './api-url.js'
import { logout } from './logout.js'
import { verify } from './verify-token.js'

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    const userData = await verify();
    const userId = userData.userDto.id;
    const tBody = document.querySelector('#paymentHistoryTableBody');
    const logoutBtn = document.querySelector('#logoutBtn');

    // Logout
    logoutBtn.addEventListener('click', logout);

    // Sidebar toggle
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    // Load payment history
    try {
        const response = await fetch(`${API_URL}/api/payments/history/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('To\'lovlar tarixini yuklashda xatolik yuz berdi');
        }

        const payments = await response.json();
        
        if (payments.length === 0) {
            tBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">To'lovlar tarixi mavjud emas</td>
                </tr>
            `;
            return;
        }

        tBody.innerHTML = payments.map((payment, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${payment.tariff_name}</td>
                <td>${payment.duration} kun</td>
                <td>${new Date(payment.created_at).toLocaleString()}</td>
                <td>${payment.amount.toLocaleString()} UZS</td>
                <td>
                    <span class="badge ${payment.status === 'completed' ? 'bg-success' : 'bg-warning'}">
                        ${payment.status === 'completed' ? 'To\'langan' : 'Kutilmoqda'}
                    </span>
                </td>
                <td>
                    ${payment.status === 'pending' ? `
                        <button class="btn btn-sm btn-primary pay-btn" data-id="${payment._id}">
                            <i class="bi bi-credit-card"></i> To'lash
                        </button>
                    ` : ''}
                </td>
            </tr>
        `).join('');

        // Add event listeners for pay buttons
        document.querySelectorAll('.pay-btn').forEach(button => {
            button.addEventListener('click', () => handlePayment(button.dataset.id));
        });

    } catch (error) {
        console.error('Error loading payment history:', error);
        tBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger">
                    To'lovlar tarixini yuklashda xatolik yuz berdi
                </td>
            </tr>
        `;
    }
});

async function handlePayment(paymentId) {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/payments/initiate/${paymentId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('To\'lovni boshlashda xatolik yuz berdi');
        }

        const data = await response.json();
        
        // Open Payme payment page
        if (data.payment_url) {
            window.open(data.payment_url, '_blank');
        }
    } catch (error) {
        console.error('Error initiating payment:', error);
        alert('To\'lovni boshlashda xatolik yuz berdi');
    }
} 