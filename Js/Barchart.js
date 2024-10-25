// Initialize the chart
const ctx = document.getElementById('myBarChart').getContext('2d');

// function to update chart tick and grid colors based on dark mode
function getTickColor() {
    return localStorage.getItem('darkMode') === 'enabled' ? '#ffffff' : '#64748B';
}

function getGridColor() {
    return localStorage.getItem('darkMode') === 'enabled' ? '#ffffff33' : '#E2E8F0'; // Use semi-transparent white in dark mode
}

// Create the chart with dynamic tick and grid colors, and dotted grid lines
const myBarChart = new Chart(ctx, {
    type: 'bar',  // Define chart type
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // X-axis labels
        datasets: [{
            label: 'Monthly Sales',
            data: [50, 60, 70, 85, 40, 90, 30, 97, 89, 73, 88, 69],  // Data for the chart
            backgroundColor: '#8576FF'
        }]
    },
    options: {
        responsive: true,  // Make chart responsive
        maintainAspectRatio: false,  // Disable aspect ratio to fit container
        plugins: {
            legend: {
                display: false  // Disable the legend
            }
        },
        scales: {
            y: {
                beginAtZero: true,  // Y-axis starts from 0
                ticks: {
                    color: getTickColor()  // Dynamically set Y-axis text color
                },
                grid: {
                    color: getGridColor(),  // Dynamically set Y-axis grid line color
                    borderDash: [5, 5],  // Create dashed grid lines (5px dash, 5px space)
                }
            },
            x: {
                ticks: {
                    color: getTickColor()  // Dynamically set X-axis text color
                },
                grid: {
                    color: getGridColor(),  // Dynamically set X-axis grid line color
                    borderDash: [5, 5],  // Create dashed grid lines (5px dash, 5px space)
                }
            }
        }
    }
});

// Function to update the tick and grid colors dynamically when dark mode is toggled
function updateChartColors() {
    myBarChart.options.scales.x.ticks.color = getTickColor();
    myBarChart.options.scales.x.grid.color = getGridColor();
    myBarChart.options.scales.y.ticks.color = getTickColor();
    myBarChart.options.scales.y.grid.color = getGridColor();
    myBarChart.update();  // Update the chart to apply new colors
}

// event listener to handle the theme change
document.getElementById('theme-switch').addEventListener('change', () => {
    updateChartColors();
});
