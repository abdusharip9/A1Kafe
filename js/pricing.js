import { API_URL } from './api-url.js'

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch features and tariffs data
        const [featuresResponse, tariffsResponse] = await Promise.all([
            fetch(`${API_URL}/api/features/get-all`),
            fetch(`${API_URL}/api/tariffs/get-all`)
        ]);

        const features = await featuresResponse.json();
        const tariffs = await tariffsResponse.json();

        const container = document.getElementById('tariffs-container');
        
        // Create tariff cards
        tariffs.forEach(tariff => {
            if (!tariff.is_free_trial) {
                const card = document.createElement('div');
                card.className = 'col-md-6 col-lg-4';
                
                const featuresList = features.map(feature => {
                    const hasFeature = tariff.features.some(tf => tf._id === feature._id);
                    return `
                        <li>
                            <i class="fa-solid fa-${hasFeature ? 'check' : 'xmark'}"></i>
                            ${feature.name}
                        </li>
                        <hr>
                    `;
                }).join('');
                card.innerHTML = `
                    <div class="pricing-card ${tariff.is_popular ? 'popular' : ''}">
                        <div class="pricing-header">
                            <div class="text-start">
                                <h2 class="pricing-title mb-2 px-3 py-1 text-primary rounded-4 border-2 border-primary fw-bold border d-inline-block">${tariff.name}</h2>
                                <p class="text-muted mb-3" style="font-size: 0.95rem; line-height: 1.4;">${tariff.description}</p>
                            </div>
                            <div class="pricing-price">
                                ${tariff.price.toLocaleString()} so'm
                            </div>
                            ${tariff.duration > 1 ? `<p class="text-muted">${tariff.duration} ${tariff.duration.type} uchun</p>` : ''}
                        </div>
                        <ul class="pricing-features">
                            ${featuresList}
                        </ul>
                        <a href="./register.html" class="btn btn-primary pricing-button">
                            Tanlash
                        </a>
                    </div>
                `;
                
                container.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Error loading pricing data:', error);
        const container = document.getElementById('tariffs-container');
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="pricing-card">
                    <p class="text-danger">Xizmatlar narxlari yuklanmadi. Iltimos, keyinroq qayta urinib ko'ring.</p>
                </div>
            </div>
        `;
    }
}); 