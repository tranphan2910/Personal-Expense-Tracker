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
    fetch(`/expenses/monthly-expenses-growth/${mths}`)
      .then(response => response.json())
      .then(result => {
        console.log('growth result:', result);  // debug

        const data = result.expenses_growth_data || {};
        const keys = Object.keys(data).reverse();
        const values = Object.values(data).reverse();

        renderGrowthChart(keys, values);
      })
      .catch(err => console.error('growth error:', err));
  }
};


document.addEventListener("DOMContentLoaded", () => {
    // Vẽ biểu đồ Growth mặc định cho 3 tháng
    getGrowthChart(3);
    document.querySelector("#growth-chart-btn-3").checked = true;
});
