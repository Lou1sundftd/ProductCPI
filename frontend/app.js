document.addEventListener('DOMContentLoaded', () => {
    const priceForm = document.getElementById('priceForm');
    const searchInput = document.getElementById('search');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceSearchButton = document.getElementById('priceSearchButton');
    const priceList = document.getElementById('priceList');
    const chartContainer = document.createElement('div');
    document.body.appendChild(chartContainer);
    const charts = {};

    priceForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const item = document.getElementById('item').value;
        const price = document.getElementById('price').value;

        await fetch('/api/prices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, item, price }),
        });

        loadPrices();
    });

    searchInput.addEventListener('input', loadPrices);
    priceSearchButton.addEventListener('click', loadPrices);

    async function loadPrices() {
        const response = await fetch('/api/prices');
        const prices = await response.json();

        const filter = searchInput.value.toLowerCase();
        const minPrice = parseFloat(minPriceInput.value);
        const maxPrice = parseFloat(maxPriceInput.value);

        const filteredPrices = prices.filter(price => {
            const matchesItemOrDate = price.item.toLowerCase().includes(filter) || price.date.includes(filter);
            const matchesPriceRange = (!isNaN(minPrice) ? price.price >= minPrice : true) &&
                (!isNaN(maxPrice) ? price.price <= maxPrice : true);
            return matchesItemOrDate && matchesPriceRange;
        });

        priceList.innerHTML = '';
        const groupedData = {};

        filteredPrices.forEach(price => {
            if (!groupedData[price.item]) {
                groupedData[price.item] = {
                    labels: [],
                    data: [],
                };
            }
            groupedData[price.item].labels.push(price.date);
            groupedData[price.item].data.push(price.price);

            const priceItem = document.createElement('div');
            priceItem.className = 'price-item';
            priceItem.textContent = `${price.date} - ${price.item} - $${price.price}`;
            priceList.appendChild(priceItem);
        });

        chartContainer.innerHTML = '';
        Object.keys(charts).forEach(item => {
            charts[item].destroy();
        });

        Object.keys(groupedData).forEach(item => {
            const canvas = document.createElement('canvas');
            chartContainer.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            charts[item] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: groupedData[item].labels,
                    datasets: [{
                        label: `${item} Price Trend`,
                        data: groupedData[item].data,
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 500
                            }
                        }
                    }
                }
            });
        });
    }

    loadPrices();
});

