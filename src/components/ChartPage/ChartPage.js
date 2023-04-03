import Chart from 'chart.js/auto';


let chartLeft = null;
  
function charterLeft(acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, valence, barcolor) {
    const ctx = document.getElementById('left-charts');

    if (chartLeft != null) {
        chartLeft.destroy()
    }

    chartLeft = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
                label: '',
                data: [acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence], // attributes of object
                borderColor: barcolor,
                backgroundColor: barcolor,
                borderRadius: 10,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            
            plugins: {
                legend: {
                    display: false,
                    position: 'right'
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    
                    max: 0,
                    min: -1,
                    beginAtZero: true,
                    display: false,
                    grid: {
                        display: false
                    }
                    
                },
                y: {
                    //max: 1,
                    //min: 0,
                    display: false,
                    beginAtZero: true,
                    grid: {
                        display: false,
                    }
                }
            }
        }
    }
    )
};

let chartRight = null;

function charterRight(acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, valence, barcolor) {
    const ctx = document.getElementById('right-charts');

    if (chartRight != null) {
        chartRight.destroy()
    }

    chartRight = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
                label: '',
                data: [acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence], // attributes of object
                borderColor: barcolor,
                backgroundColor: barcolor,
                borderRadius: 10,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false,
                    position: 'right'
                },
                //removes the tooltip
                // tooltip: {
                //     enabled: false
                // }
            },
            scales: {
                x: {
                    max: 1,
                    min: 0,
                    beginAtZero: true,
                    display: false,
                    grid: {
                        display: false
                    }
                },
                y: {
                    //max: 1,
                    display: false,
                    beginAtZero: true,
                    grid: {
                        display: false,
                    },
                }
            }
        }
    }
    )
};

export { charterLeft, charterRight }