function preprocessGraphEquation(expr) {
            return expr
                .replace(/π/g, 'pi')
                .replace(/÷/g, '/')
                .replace(/×/g, '*')
                .replace(/\^/g, '**')
                .replace(/−/g, '-')
                .replace(/(\d+)%/g, '($1/100)');
        }

        function plotGraph() {
            const equationInput = document.getElementById('graphEquation');
            const equationText = equationInput.value.trim();

            const canvas = document.getElementById('graphCanvas');
            const ctx = canvas.getContext('2d');

            
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            
            if (chart) {
                chart.destroy();
                chart = null;
            }

            
            const graphContainer = document.querySelector('.graph-container');
            const oldError = graphContainer.querySelector('.graph-error');
            if (oldError) oldError.remove();

            try {
                if (!equationText || !/^[\dx+\-*/().^a-zA-Z\s]+$/.test(equationText)) {
                    throw new Error("Invalid or empty equation");
                }

            
                const compiled = math.compile(equationText);
                const points = [];
                const step = 0.2;
                const range = 10;

                for (let x = -range; x <= range; x += step) {
                    try {
                        const y = compiled.evaluate({ x });
                        if (typeof y === 'number' && isFinite(y)) {
                            points.push({ x: parseFloat(x.toFixed(2)), y });
                        }
                    } catch {
                        continue;
                    }
                }

                if (points.length === 0) throw new Error("No valid points to plot");

                chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: [{
                            label: `y = ${equationText}`,
                            data: points,
                            borderColor: '#ff6b6b',
                            backgroundColor: 'rgba(255,107,107,0.1)',
                            borderWidth: 2,
                            pointRadius: 1,
                            tension: 0.2,
                            fill: false
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: document.body.classList.contains('dark') ? '#fff' : '#333'
                                }
                            }
                        },
                        scales: {
                            x: {
                                type: 'linear',
                                title: {
                                    display: true,
                                    text: 'x',
                                    color: document.body.classList.contains('dark') ? '#fff' : '#333'
                                },
                                ticks: {
                                    color: document.body.classList.contains('dark') ? '#fff' : '#333'
                                },
                                grid: {
                                    color: 'rgba(255,255,255,0.1)'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'y',
                                    color: document.body.classList.contains('dark') ? '#fff' : '#333'
                                },
                                ticks: {
                                    color: document.body.classList.contains('dark') ? '#fff' : '#333'
                                },
                                grid: {
                                    color: 'rgba(255,255,255,0.1)'
                                }
                            }
                        }
                    }
                });

            } catch (error) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'graph-error';
                errorDiv.textContent = `Error plotting "${equationText}": ${error.message}`;
                graphContainer.appendChild(errorDiv);
                console.error("Graph plotting error:", error.message);
            }
        }



let graphTimer;
document.getElementById('graphEquation').addEventListener('input', function () {
    clearTimeout(graphTimer);
    graphTimer = setTimeout(() => {
        if (document.getElementById('graphPanel').classList.contains('active')) {
            plotGraph();
        }
    }, 400);
});