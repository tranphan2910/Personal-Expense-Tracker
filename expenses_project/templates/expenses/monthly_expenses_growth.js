let renderGrowthChart = (labels, dataInfo) => {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Expense Growth/Decline',
            data: dataInfo,
            fill: false,
            borderColor: 'rgb(255, 99, 132)', // Màu đường
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            title: {
                display: true,
                text: 'Monthly Expense Growth/Decline'
            }
        },
    };

    // Xử lý biểu đồ
    const ctx = document.getElementById('growth-chart').getContext('2d');
    new Chart(ctx, config);
}

const getGrowthChart = (mths) => {
    if (mths > 0) {
        fetch(`/expenses/expenses-growth-summary/${mths}`)
        .then(response => response.json())
        .then(result => {
            const keys = Object.keys(result.expenses_growth_data).reverse();
            const values = Object.values(result.expenses_growth_data).reverse();
            renderGrowthChart(keys, values);
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Vẽ biểu đồ Growth mặc định cho 3 tháng
    getGrowthChart(3);
    document.querySelector("#growth-chart-btn-3").checked = true;
});
