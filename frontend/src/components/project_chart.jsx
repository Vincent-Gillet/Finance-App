import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function ProjectChart({ goalMoney, stateMoney }) {
    const data = {
        labels: ['Somme accumulée', 'Reste à atteindre'],
        datasets: [
            {
                data: [stateMoney, goalMoney - stateMoney],
                backgroundColor: ['rgba(0, 189, 154, 1)', 'rgba(255, 255, 255, 1)'],
                borderColor: ['rgba(128, 222, 205, 1)', 'rgba(128, 222, 205, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Répartition du Budget',
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                    return percentage;
                },
                color: 'black',
                font: {
                    weight: 'bold',
                },
            },
        },
    };

    return <Pie data={data} options={options} />;
}

export default ProjectChart;