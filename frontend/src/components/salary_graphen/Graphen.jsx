import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Graphen({ dataPrognose }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (dataPrognose && dataPrognose.size > 0) {
            if (chartRef.current) {
                chartRef.current.data.labels = Array.from(dataPrognose.keys());
                chartRef.current.data.datasets[0].data = Array.from(dataPrognose.values());
                chartRef.current.update();
            } else {
                const canvas = document.getElementById("myChart");
                canvas.width = 400;
                canvas.height = 500;
                chartRef.current = new Chart(canvas, {
                    type: "line",
                    data: {
                        labels: Array.from(dataPrognose.keys()),
                        datasets: [{  // Hier ist die Änderung
                            label: "Jahresgehalt in $",
                            backgroundColor: "rgba(0,0,255,1.0)",
                            borderColor: "rgba(0,0,255,0.1)",
                            data: Array.from(dataPrognose.values()),
                        }],
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: "Gehaltsentwicklung",
                            },
                        },
                    },
                });
            }
        }
    }, [dataPrognose]);

    return (
        <div id={"graphen"}>
            <canvas id={"myChart"}></canvas>
        </div>
    );
}

export default Graphen;
