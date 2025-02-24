import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({score,authenticity}) => {

    const real=authenticity===0;

    const data = {
        labels: [],
        datasets: [
            {
                data: [score, 100 - score], 
                backgroundColor: [real?"#4dde00":"red", real?"#abff7e":"#ff7a7a"], 
                borderColor: [real?"#4dde00":"red", "transparent"], 
                borderWidth: 1, 
                borderJoinStyle: "round", 
                // hoverBackgroundColor: ["#d4a76a", "transparent"], 
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "88%",
        rotation: 0, 
        circumference: 360, 
        plugins: {
            legend: { display: false }, 
            tooltip: { enabled: false }, 
        },
    };

    // Plugin for center text
    const centerTextPlugin = {
        id: "centerText",
        beforeDraw: (chart) => {
            if (!chart || !chart.ctx) return;
            const { width, height, ctx } = chart;
            ctx.save();
            
            // Font settings
            ctx.font = `${(height / 8).toFixed(2)}px Arial`;
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = real?"#4dde00":"red"; // Text color

            // Position
            const centerX = width / 2;
            const centerY = height / 2;

            // Draw Text
            ctx.fillText(`Likely`, centerX, centerY - 10);
            ctx.fillText(real?"Real":"Fake", centerX, centerY + 10);
            ctx.font = `${(height / 10).toFixed(2)}px Arial`;
            ctx.restore();
        },
    };

    return (
            <Pie data={data} options={options} plugins={[centerTextPlugin]} />
    );
};

export default PieChart;
