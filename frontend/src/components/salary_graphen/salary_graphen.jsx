import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";
import "./salary_graphen.css";

function SalaryGraphen({ dataPrognose }) {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const formatSalary = (salary) => {
        if (!salary) return "0 €";
        
        let cleanSalary = salary;
        if (typeof salary === 'string') {
            cleanSalary = salary.replace(/[^0-9,.-]/g, '').replace(',', '.');
        }
        
        const numSalary = parseFloat(cleanSalary);
        if (isNaN(numSalary)) return "0 €";
        
        if (numSalary >= 1000000) {
            return (numSalary / 1000000).toFixed(2) + " Mio. €";
        } else if (numSalary >= 1000) {
            return (numSalary / 1000).toFixed(0) + " Tsd. €";
        }
        
        return numSalary.toLocaleString('de-DE') + " €";
    };

    const formatYAxisLabel = (value) => {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + "M";
        } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + "k";
        }
        return value;
    };

    useEffect(() => {
        if (dataPrognose && dataPrognose.size > 0) {
            const canvas = document.getElementById("salaryChart");
            if (!canvas) return;
            
            const ctx = canvas.getContext("2d");
            
            const years = Array.from(dataPrognose.keys());
            let salaries = Array.from(dataPrognose.values());
            
            salaries = salaries.map(salary => {
                if (typeof salary === 'string') {
                    return parseFloat(salary.replace(/[^0-9,.-]/g, '').replace(',', '.'));
                }
                return salary;
            });
            
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            
            chartInstanceRef.current = new Chart(ctx, {
                type: "line",
                data: {
                    labels: years,
                    datasets: [
                        {
                            label: "Jahresgehalt",
                            data: salaries,
                            borderColor: "rgba(102, 126, 234, 1)",
                            backgroundColor: "rgba(102, 126, 234, 0.1)",
                            borderWidth: 3,
                            pointRadius: 6,
                            pointHoverRadius: 10,
                            pointBackgroundColor: "rgba(102, 126, 234, 1)",
                            pointBorderColor: "white",
                            pointBorderWidth: 2,
                            tension: 0.3,
                            fill: true,
                        },
                        {
                            label: "Durchschnitt",
                            data: salaries.map(s => salaries.reduce((a, b) => a + b, 0) / salaries.length),
                            borderColor: "rgba(247, 135, 179, 0.8)",
                            backgroundColor: "rgba(247, 135, 179, 0.05)",
                            borderWidth: 2,
                            borderDash: [5, 5],
                            pointRadius: 0,
                            fill: false,
                        }
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    const value = context.parsed.y;
                                    label += formatSalary(value);
                                    return label;
                                }
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: 'white',
                            bodyColor: 'white',
                            borderColor: 'rgba(102, 126, 234, 1)',
                            borderWidth: 2,
                            bodyFont: {
                                size: 14
                            },
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            padding: 12,
                        },
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                boxWidth: 15,
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                },
                                padding: 20
                            }
                        },
                        title: {
                            display: true,
                            text: "📈 Gehaltsentwicklung bis zur Rente",
                            font: {
                                size: 20,
                                weight: 'bold'
                            },
                            padding: {
                                top: 10,
                                bottom: 30
                            }
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: "Jahresgehalt (Euro)",
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                },
                                padding: {
                                    bottom: 10
                                }
                            },
                            ticks: {
                                callback: function(value) {
                                    return formatYAxisLabel(value);
                                },
                                font: {
                                    size: 13
                                },
                                stepSize: (Math.max(...salaries) - Math.min(...salaries)) / 6,
                                padding: 10
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.08)',
                                drawBorder: true,
                                lineWidth: 1
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Alter (Jahre)",
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                },
                                padding: {
                                    top: 10
                                }
                            },
                            grid: {
                                display: false,
                            },
                            ticks: {
                                font: {
                                    size: 13
                                },
                                stepSize: 5,
                                maxRotation: 0,
                                minRotation: 0,
                                padding: 10
                            }
                        }
                    },
                    elements: {
                        line: {
                            tension: 0.4
                        },
                        point: {
                            hoverRadius: 12
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    },
                    layout: {
                        padding: {
                            top: 20,
                            bottom: 20,
                            left: 10,
                            right: 20
                        }
                    }
                },
            });
        }
        
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [dataPrognose]);

    const getStatistics = () => {
        if (!dataPrognose || dataPrognose.size === 0) return null;
        
        const salaries = Array.from(dataPrognose.values()).map(s => {
            if (typeof s === 'string') {
                return parseFloat(s.replace(/[^0-9,.-]/g, '').replace(',', '.'));
            }
            return s;
        });
        
        const maxSalary = Math.max(...salaries);
        const minSalary = Math.min(...salaries);
        const avgSalary = salaries.reduce((a, b) => a + b, 0) / salaries.length;
        const totalGrowth = ((maxSalary - minSalary) / minSalary) * 100;
        
        return { maxSalary, minSalary, avgSalary, totalGrowth };
    };
    
    const stats = getStatistics();

    return (
        <div className="salary-graphen-container">
            <div className="graphen-stats">
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-info">
                        <div className="stat-label">Maximales Gehalt</div>
                        <div className="stat-value">{stats ? formatSalary(stats.maxSalary) : "—"}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-info">
                        <div className="stat-label">Durchschnitt</div>
                        <div className="stat-value">{stats ? formatSalary(stats.avgSalary) : "—"}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-info">
                        <div className="stat-label">Gesamtwachstum</div>
                        <div className="stat-value">{stats ? stats.totalGrowth.toFixed(1) + "%" : "—"}</div>
                    </div>
                </div>
            </div>
            
            <div className="graphen-wrapper">
                <div className="graphen-canvas-container">
                    <canvas id="salaryChart" className="graphen-canvas"></canvas>
                </div>
            </div>
            
            <div className="graphen-footer">
                <p className="graphen-hint">
                    💡 Die Prognose basiert auf Ihrer aktuellen Karriereentwicklung und Markttrends
                </p>
                <p className="graphen-hint-small">
                    📊 Werte sind Jahresbruttogehälter in Euro | Stand: 2024
                </p>
            </div>
        </div>
    );
}

SalaryGraphen.propTypes = {
    dataPrognose: PropTypes.instanceOf(Map)
};

export default SalaryGraphen;