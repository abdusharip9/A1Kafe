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

        // Sort tariffs by price (using monthly price if available)
        tariffs.sort((a, b) => {
            const priceA = a.durations.monthly?.price || a.durations.daily?.price || 0;
            const priceB = b.durations.monthly?.price || b.durations.daily?.price || 0;
            return priceA - priceB;
        });

        const container = document.getElementById('tariffs-container');
        
        // Create tariff cards
        tariffs.forEach(tariff => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';
            
            // Get the price and duration
            const duration = tariff.durations.monthly || tariff.durations.daily;
            const price = duration.price;
            const durationText = tariff.durations.monthly ? 'oy' : 'kun';
            const durationValue = duration.duration;
            
            const featuresList = features.map(feature => {
                const hasFeature = tariff.features.some(tf => tf._id === feature._id);
                return `
                    <li>
                        <i class="fa-solid fa-${hasFeature ? 'check' : 'xmark'}"></i>
                        ${feature.name}
                    </li>
                `;
            }).join('');

            card.innerHTML = `
                <div class="pricing-card ${tariff.is_popular ? 'popular' : ''}">
                    ${tariff.is_free_trial ? '<span class="pricing-badge">Bepul sinov</span>' : ''}
                    <div class="pricing-header">
                        <h3 class="pricing-title">${tariff.name}</h3>
                        <div class="pricing-price">
                            ${price.toLocaleString()} so'm
                            <small>/${durationText}</small>
                        </div>
                        ${durationValue > 1 ? `<p class="text-muted">${durationValue} ${durationText} uchun</p>` : ''}
                    </div>
                    <ul class="pricing-features">
                        ${featuresList}
                    </ul>
                    <a href="./register.html" class="btn btn-primary pricing-button">
                        Ro'yhatdan o'tish
                    </a>
                </div>
            `;

            container.appendChild(card);
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