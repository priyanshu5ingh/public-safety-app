import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function CrimeAnalytics() {
  const crimeTypes = ["Theft", "Assault", "Burglary", "Vandalism", "Fraud"];
  const monthlyData = [12, 19, 8, 15, 10];
  const areaData = [30, 25, 20, 15, 10];
  const timeData = [5, 8, 12, 15, 10, 8, 6];

  const barChartData = {
    labels: crimeTypes,
    datasets: [
      {
        label: "Crime Incidents",
        data: monthlyData,
        backgroundColor: "rgba(79, 70, 229, 0.5)",
        borderColor: "rgb(79, 70, 229)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5"],
    datasets: [
      {
        data: areaData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"],
    datasets: [
      {
        label: "Crime Frequency",
        data: timeData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Crime Analytics Dashboard
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Crime Types Distribution
            </h3>
            <Bar data={barChartData} />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Area-wise Crime Distribution
            </h3>
            <Pie data={pieChartData} />
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Time-based Crime Analysis
          </h3>
          <Line data={lineChartData} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-indigo-900">
              Peak Crime Hours
            </h4>
            <p className="text-2xl font-semibold text-indigo-600">3PM - 6PM</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-red-900">
              Most Common Crime
            </h4>
            <p className="text-2xl font-semibold text-red-600">Theft</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-green-900">Safest Area</h4>
            <p className="text-2xl font-semibold text-green-600">Sector 5</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrimeAnalytics;
