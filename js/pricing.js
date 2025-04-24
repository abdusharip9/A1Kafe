document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch features and tariffs data
        const [featuresResponse, tariffsResponse] = await Promise.all([
            fetch('http://localhost:3000/api/features/get-all'),
            fetch('http://localhost:3000/api/tariffs/get-all')
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
            card.className = 'col mb-2 d-flex';
            
            // Get the price and duration
            const duration = tariff.durations.monthly || tariff.durations.daily;
            const price = duration.price;
            const durationText = tariff.durations.monthly ? 'oy' : 'kun';
            const durationValue = duration.duration;
            
            const featuresList = features.map(feature => {
                const hasFeature = tariff.features.some(tf => tf._id === feature._id);
                return `
                    <li>${feature.name} 
                        <i class="fa-solid fa-${hasFeature ? 'check' : 'xmark'}" 
                           style="color: ${hasFeature ? '#63E6BE' : '#ff0000'};"></i>
                    </li>
                `;
            }).join('');

            card.innerHTML = `
                <div class="card mb-4 rounded-3 shadow-sm w-100 d-flex flex-column">
                    <div class="card-header py-3 d-flex justify-content-between align-items-center">
                        <h4 class="my-0 fw-normal">${tariff.name}</h4>
                        ${tariff.is_free_trial ? '<span class="badge bg-success">Bepul sinov</span>' : ''}
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h1 class="card-title pricing-card-title">
                            ${price.toLocaleString()} so'm
                            <small class="text-body-secondary fw-light">/${durationText}</small>
                        </h1>
                        ${durationValue > 1 ? `<p class="text-muted">${durationValue} ${durationText} uchun</p>` : ''}
                        <ul class="list-unstyled mt-3 mb-4 flex-grow-1">
                            ${featuresList}
                        </ul>
                        <a href="./register.html" class="w-100 btn btn-lg btn-outline-primary mt-auto">
                            Ro'yhatdan o'tish
                        </a>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading pricing data:', error);
        const container = document.getElementById('tariffs-container');
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Xizmatlar narxlari yuklanmadi. Iltimos, keyinroq qayta urinib ko'ring.</p>
            </div>
        `;
    }
}); 