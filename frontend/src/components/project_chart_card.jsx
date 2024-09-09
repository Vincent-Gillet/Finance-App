import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function ProjectChartCard({ project }) {
    const navigate = useNavigate();

    const data = {
        labels: ['Somme accumulée', 'Reste à atteindre'],
        datasets: [
            {
                data: [project.state_money, project.goal_money - project.state_money],
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
                display: false,
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                    return percentage;
                },
                color: '#fff',
                font: {
                    weight: 'bold',
                },
            },
        },
    };

    return (
        <div className="project-card">
            <h3>{project.title}</h3>
            <Pie data={data} options={options} />
            <button onClick={() => navigate(`/projects/${project.id}`)}>Voir le projet</button>
        </div>
    );
}

export default ProjectChartCard;