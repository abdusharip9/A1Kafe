import { API_URL } from '../../js/api-url.js'

// Login form elementlarini olish
const loginForm = document.getElementById('loginForm');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const errorToast = document.getElementById('errorToast');
const errorToastMessage = document.getElementById('errorToastMessage');

// Error message ko'rsatish funksiyasi
function showError(message) {
    errorToastMessage.textContent = message;
    const bsErrorToast = new bootstrap.Toast(errorToast);
    bsErrorToast.show();
}

// Login form submit handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!loginUsername.value.trim() || !loginPassword.value.trim()) {
        showError('Login va parolni kiriting!');
        return;
    }
    
    // Submit tugmasini disable qilish
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Kirish...';
    
    try {
        // Login API ga so'rov yuborish
        const response = await fetch(`${API_URL}/api/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loginUsername.value.trim(),
                password: loginPassword.value
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Muvaffaqiyatli login
            // Token ni localStorage ga saqlash (agar API token qaytarsa)
            if (data.data.accessToken) {
                localStorage.setItem('accessToken', data.data.accessToken);
            }
            
            // User information ni saqlash
            if (data.data.user.id) {
                localStorage.setItem('id', data.data.user.id);
            }
            
            // index.html ga redirect qilish
            window.location.href = 'index.html';
        } else {
            // Xatolik holati
            showError(data.message || 'Login yoki parol noto\'g\'ri!');
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('Server bilan bog\'lanishda xatolik yuz berdi!');
    } finally {
        // Submit tugmasini qayta aktiv qilish
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

// Password ko'rsatish/yashirish funksiyasi
document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('.toggle-password');
    
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const targetId = togglePassword.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const icon = togglePassword.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.className = 'bi bi-eye-slash';
            } else {
                passwordInput.type = 'password';
                icon.className = 'bi bi-eye';
            }
        });
    }
    
    // Enter tugmasini bosish orqali form submit qilish
    loginUsername.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginPassword.focus();
        }
    });
    
    loginPassword.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
});

// Sahifa yuklanganda remember me ni tekshirish
window.addEventListener('load', () => {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    
    if (rememberMe && rememberedUsername) {
        document.getElementById('rememberMe').checked = true;
        loginUsername.value = rememberedUsername;
        loginPassword.focus();
    }
});